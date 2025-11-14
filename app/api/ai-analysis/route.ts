import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client only if API key is available
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null

export async function POST(request: NextRequest) {
  let symbol: string | undefined
  let stockData: any | undefined

  try {
    const body = await request.json()
    symbol = body.symbol
    stockData = body.stockData

    if (!symbol || !stockData) {
      return NextResponse.json(
        { error: 'Symbol and stock data are required' },
        { status: 400 }
      )
    }

    // If OpenAI API key is not set or client is not initialized, return mock analysis
    if (!process.env.OPENAI_API_KEY || !openai) {
      return NextResponse.json(getMockAnalysis(symbol, stockData))
    }

    // Prepare prompt for AI analysis with safe property access
    const price = stockData.price ?? 0
    const change = stockData.change ?? 0
    const changePercent = stockData.changePercent ?? 0
    const volume = stockData.volume ?? 0
    const high = stockData.high ?? 0
    const low = stockData.low ?? 0
    const open = stockData.open ?? 0
    const previousClose = stockData.previousClose ?? 0

    const prompt = `Analyze the following stock data and provide a comprehensive investment recommendation.

Stock Symbol: ${symbol}
Current Price: $${price}
Change: ${change >= 0 ? '+' : ''}${change} (${changePercent >= 0 ? '+' : ''}${changePercent}%)
Volume: ${volume.toLocaleString()}
High: $${high}
Low: $${low}
Open: $${open}
Previous Close: $${previousClose}

Please provide:
1. A clear recommendation (BUY, SELL, or HOLD)
2. Your confidence level (0-100%)
3. A detailed analysis explaining your reasoning
4. Key points supporting your recommendation
5. Risk assessment with risk level (Low, Medium, High) and key risk factors

Format your response as JSON with the following structure:
{
  "action": "BUY|SELL|HOLD",
  "confidence": 85,
  "analysis": "Detailed analysis text...",
  "keyPoints": ["Point 1", "Point 2", "Point 3"],
  "riskLevel": "Low|Medium|High",
  "riskFactors": ["Risk factor 1", "Risk factor 2"]
}`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a professional financial analyst with expertise in stock market analysis. Provide clear, data-driven investment recommendations.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const responseText = completion.choices[0]?.message?.content || ''
    
    // Try to parse JSON from response
    let analysis
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) || 
                       responseText.match(/```\s*([\s\S]*?)\s*```/)
      const jsonText = jsonMatch ? jsonMatch[1] : responseText
      analysis = JSON.parse(jsonText)
    } catch (parseError) {
      // If parsing fails, create structured response from text
      analysis = {
        action: extractAction(responseText),
        confidence: extractConfidence(responseText),
        analysis: responseText,
        keyPoints: extractKeyPoints(responseText),
        riskLevel: 'Medium',
        riskFactors: [],
      }
    }

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Error in AI analysis:', error)
    
    // Return mock analysis on error (using variables already extracted)
    if (symbol && stockData) {
      return NextResponse.json(getMockAnalysis(symbol, stockData))
    }
    
    // If we couldn't extract the data, return an error
    return NextResponse.json(
      { error: 'Failed to analyze stock data' },
      { status: 500 }
    )
  }
}

function extractAction(text: string): string {
  const upperText = text.toUpperCase()
  if (upperText.includes('BUY')) return 'BUY'
  if (upperText.includes('SELL')) return 'SELL'
  if (upperText.includes('HOLD')) return 'HOLD'
  return 'HOLD'
}

function extractConfidence(text: string): number {
  const match = text.match(/(\d+)%/i)
  return match ? parseInt(match[1]) : 75
}

function extractKeyPoints(text: string): string[] {
  const points: string[] = []
  const lines = text.split('\n')
  
  for (const line of lines) {
    if (line.match(/^[-•*]\s+/) || line.match(/^\d+\.\s+/)) {
      points.push(line.replace(/^[-•*]\s+/, '').replace(/^\d+\.\s+/, '').trim())
    }
  }
  
  return points.slice(0, 5) // Return up to 5 key points
}

function getMockAnalysis(symbol: string, stockData: any) {
  // Provide safe defaults for all properties
  const price = stockData.price ?? 0
  const change = stockData.change ?? 0
  const changePercent = stockData.changePercent ?? 0
  const volume = stockData.volume ?? 0
  const high = stockData.high ?? 0
  const low = stockData.low ?? 0
  
  const isPositive = change >= 0
  const action = isPositive && changePercent > 2 ? 'BUY' : 
                 !isPositive && changePercent < -2 ? 'SELL' : 'HOLD'
  
  return {
    action,
    confidence: 75 + Math.floor(Math.random() * 20),
    analysis: `Based on the current market data for ${symbol}, the stock is trading at $${price.toFixed(2)}, representing a ${isPositive ? 'gain' : 'loss'} of ${Math.abs(changePercent).toFixed(2)}% from the previous close.

The stock shows ${isPositive ? 'positive' : 'negative'} momentum with a current price ${isPositive ? 'above' : 'below'} the opening price. Volume activity of ${(volume / 1000000).toFixed(2)}M shares indicates ${volume > 5000000 ? 'strong' : 'moderate'} market interest.

Technical indicators suggest ${action === 'BUY' ? 'potential upside' : action === 'SELL' ? 'potential downside' : 'sideways movement'}. Investors should consider their risk tolerance and investment horizon before making a decision.`,
    keyPoints: [
      `Current price movement: ${isPositive ? '+' : ''}${changePercent.toFixed(2)}%`,
      `Trading range: $${low.toFixed(2)} - $${high.toFixed(2)}`,
      `Volume: ${(volume / 1000000).toFixed(2)}M shares`,
      action === 'BUY' ? 'Positive momentum indicators' : action === 'SELL' ? 'Negative momentum indicators' : 'Neutral market sentiment',
      'Consider market conditions and company fundamentals',
    ],
    riskLevel: changePercent > 5 || changePercent < -5 ? 'High' : 'Medium',
    riskFactors: [
      'Market volatility',
      'Economic conditions',
      'Company-specific factors',
    ],
  }
}

