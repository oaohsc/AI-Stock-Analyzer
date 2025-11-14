'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

interface StockSearchProps {
  onStockSelect: (symbol: string) => void
}

export default function StockSearch({ onStockSelect }: StockSearchProps) {
  const [symbol, setSymbol] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedSymbol = symbol.trim().toUpperCase()
    
    if (!trimmedSymbol) {
      setError('Please enter a stock symbol')
      return
    }

    setError('')
    onStockSelect(trimmedSymbol)
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={symbol}
            onChange={(e) => {
              setSymbol(e.target.value)
              setError('')
            }}
            placeholder="Enter stock symbol (e.g., AAPL, MSFT, GOOGL)"
            className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Analyze
        </button>
      </div>
      {error && (
        <p className="mt-2 text-red-400 text-sm">{error}</p>
      )}
    </form>
  )
}

