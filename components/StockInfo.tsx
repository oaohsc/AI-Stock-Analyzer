'use client'

import { TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react'

interface StockInfoProps {
  stockData: {
    symbol?: string
    name?: string
    price?: number
    change?: number
    changePercent?: number
    volume?: number
    marketCap?: number
    high?: number
    low?: number
    open?: number
    previousClose?: number
  }
}

export default function StockInfo({ stockData }: StockInfoProps) {
  // Provide default values to prevent undefined errors
  const price = stockData.price ?? 0
  const change = stockData.change ?? 0
  const changePercent = stockData.changePercent ?? 0
  const volume = stockData.volume ?? 0
  const high = stockData.high ?? 0
  const low = stockData.low ?? 0
  const open = stockData.open ?? 0
  const symbol = stockData.symbol ?? 'N/A'
  const name = stockData.name ?? 'Unknown'
  
  const isPositive = change >= 0

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-3xl font-bold text-white">{symbol}</h2>
          <p className="text-gray-300 mt-1">{name}</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-white mb-1">
            ${price.toFixed(2)}
          </div>
          <div className={`flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? (
              <TrendingUp className="w-5 h-5" />
            ) : (
              <TrendingDown className="w-5 h-5" />
            )}
            <span className="font-semibold">
              {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary-400" />
          <div>
            <p className="text-gray-400 text-sm">Open</p>
            <p className="text-white font-semibold">${open.toFixed(2)}</p>
          </div>
        </div>
        <div>
          <p className="text-gray-400 text-sm">High</p>
          <p className="text-white font-semibold">${high.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Low</p>
          <p className="text-white font-semibold">${low.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Volume</p>
          <p className="text-white font-semibold">
            {volume.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}

