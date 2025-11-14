'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface ChartDataPoint {
  date: string
  price: number
}

interface StockChartProps {
  data?: ChartDataPoint[]
}

export default function StockChart({ data }: StockChartProps) {
  // Handle empty or undefined data
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <p className="text-gray-400">No chart data available</p>
      </div>
    )
  }

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="date" 
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
            domain={['auto', 'auto']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#fff'
            }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#0ea5e9"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

