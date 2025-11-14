'use client'

import { useState, useEffect } from 'react'
import { Brain, Loader2, ThumbsUp, ThumbsDown, AlertCircle } from 'lucide-react'

interface AIRecommendationProps {
  symbol: string
  stockData: any
}

export default function AIRecommendation({ symbol, stockData }: AIRecommendationProps) {
  const [recommendation, setRecommendation] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecommendation = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/ai-analysis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            symbol,
            stockData,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to get AI analysis')
        }

        const data = await response.json()
        setRecommendation(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendation()
  }, [symbol, stockData])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-primary-400 animate-spin mr-3" />
        <span className="text-gray-300">Analyzing with AI...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 text-red-400 py-8">
        <AlertCircle className="w-6 h-6" />
        <p>{error}</p>
      </div>
    )
  }

  if (!recommendation) {
    return null
  }

  const getRecommendationColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'buy':
        return 'text-green-400 bg-green-400/10'
      case 'sell':
        return 'text-red-400 bg-red-400/10'
      case 'hold':
        return 'text-yellow-400 bg-yellow-400/10'
      default:
        return 'text-blue-400 bg-blue-400/10'
    }
  }

  return (
    <div className="space-y-6">
      {/* Recommendation Badge */}
      <div className="flex items-center gap-4">
        <div className={`px-4 py-2 rounded-lg font-semibold ${getRecommendationColor(recommendation.action)}`}>
          {recommendation.action.toUpperCase()}
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <Brain className="w-5 h-5 text-primary-400" />
          <span>AI Confidence: {recommendation.confidence}%</span>
        </div>
      </div>

      {/* Analysis */}
      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-3">Analysis</h3>
        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
          {recommendation.analysis}
        </p>
      </div>

      {/* Key Points */}
      {recommendation.keyPoints && recommendation.keyPoints.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Key Points</h3>
          <ul className="space-y-2">
            {recommendation.keyPoints.map((point: string, index: number) => (
              <li key={index} className="flex items-start gap-3 text-gray-300">
                <span className="text-primary-400 mt-1">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Risk Assessment */}
      {recommendation.riskLevel && (
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-3">Risk Assessment</h3>
          <p className="text-gray-300">
            Risk Level: <span className="font-semibold text-white">{recommendation.riskLevel}</span>
          </p>
          {recommendation.riskFactors && (
            <ul className="mt-3 space-y-2">
              {recommendation.riskFactors.map((factor: string, index: number) => (
                <li key={index} className="text-gray-400 text-sm flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

