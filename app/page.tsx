'use client'

import { useState } from 'react'
import StockSearch from '@/components/StockSearch'
import StockChart from '@/components/StockChart'
import StockInfo from '@/components/StockInfo'
import AIRecommendation from '@/components/AIRecommendation'
import { TrendingUp, BarChart3, Brain } from 'lucide-react'

export default function Home() {
  const [selectedStock, setSelectedStock] = useState<string | null>(null)
  const [stockData, setStockData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleStockSelect = async (symbol: string) => {
    setSelectedStock(symbol)
    setLoading(true)
    try {
      const response = await fetch(`/api/stock-data?symbol=${symbol}`)
      const data = await response.json()
      
      // Check if response contains an error
      if (data.error) {
        console.error('API error:', data.error)
        // Still set stockData to null so we can show an error state if needed
        setStockData(null)
      } else {
        setStockData(data)
      }
    } catch (error) {
      console.error('Error fetching stock data:', error)
      setStockData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-12 h-12 text-primary-400" />
            <h1 className="text-5xl font-bold text-white">AI Stock Analyzer</h1>
          </div>
          <p className="text-xl text-gray-300">
            Get AI-powered insights and recommendations for your stock investments
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <StockSearch onStockSelect={handleStockSelect} />
        </div>

        {/* Main Content */}
        {selectedStock && (
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
                <p className="mt-4 text-gray-300">Loading stock data...</p>
              </div>
            ) : stockData ? (
              <>
                {/* Stock Info Card */}
                <StockInfo stockData={stockData} />

                {/* Chart Section */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="w-6 h-6 text-primary-400" />
                    <h2 className="text-2xl font-semibold text-white">Price Chart</h2>
                  </div>
                  <StockChart data={stockData.chartData || []} />
                </div>

                {/* AI Recommendation Section */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <Brain className="w-6 h-6 text-primary-400" />
                    <h2 className="text-2xl font-semibold text-white">AI Analysis & Recommendation</h2>
                  </div>
                  <AIRecommendation symbol={selectedStock} stockData={stockData} />
                </div>
              </>
            ) : null}
          </div>
        )}

        {/* Empty State */}
        {!selectedStock && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <TrendingUp className="w-24 h-24 text-primary-400 mx-auto mb-6 opacity-50" />
              <h2 className="text-2xl font-semibold text-white mb-4">
                Start Analyzing Stocks
              </h2>
              <p className="text-gray-400">
                Enter a stock symbol above to get AI-powered analysis and recommendations
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

