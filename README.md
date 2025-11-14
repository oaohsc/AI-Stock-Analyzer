# AI Stock Analyzer

<img width="2525" height="1332" alt="Image" src="https://github.com/user-attachments/assets/eb22d805-a753-4f3e-b6ab-4034568328f0" />

A modern web application for AI-powered stock analysis and investment recommendations. Built with Next.js, TypeScript, and OpenAI.

## Features

- 🔍 **Stock Search**: Search for any stock by symbol (e.g., AAPL, MSFT, GOOGL)
- 📊 **Real-time Data**: Get current stock prices, volume, and market data
- 📈 **Interactive Charts**: Visualize stock price trends over the last 30 days
- 🤖 **AI Analysis**: Get AI-powered investment recommendations with detailed analysis
- 💡 **Key Insights**: Understand risk factors and key points for each stock
- 🎨 **Modern UI**: Beautiful, responsive design with dark theme

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **AI**: OpenAI GPT-4
- **Stock Data**: Alpha Vantage API

## Prerequisites

- Node.js 18+ and npm/yarn
- OpenAI API key (get one at [https://platform.openai.com/](https://platform.openai.com/))
- Alpha Vantage API key (free tier available at [https://www.alphavantage.co/support/#api-key](https://www.alphavantage.co/support/#api-key))

## Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd ai-stock-analyzer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   
   Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your API keys:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key_here
   ```

   **Note**: The app will work with mock data if API keys are not provided, but for full functionality, both keys are recommended.

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser:**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. Enter a stock symbol in the search box (e.g., AAPL, MSFT, TSLA)
2. Click "Analyze" to fetch stock data
3. View the stock information, price chart, and AI-powered recommendations
4. Review the analysis, key points, and risk assessment

## API Routes

### `/api/stock-data`
- **Method**: GET
- **Query Parameters**: `symbol` (required)
- **Returns**: Stock data including price, volume, chart data, etc.

### `/api/ai-analysis`
- **Method**: POST
- **Body**: `{ symbol: string, stockData: object }`
- **Returns**: AI-generated analysis and recommendation

## Project Structure

```
ai-stock-analyzer/
├── app/
│   ├── api/
│   │   ├── stock-data/
│   │   │   └── route.ts      # Stock data API endpoint
│   │   └── ai-analysis/
│   │       └── route.ts      # AI analysis API endpoint
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main page
├── components/
│   ├── StockSearch.tsx        # Search component
│   ├── StockInfo.tsx          # Stock information display
│   ├── StockChart.tsx         # Price chart component
│   └── AIRecommendation.tsx   # AI analysis display
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

## Features in Detail

### Stock Data
- Real-time price information
- Daily price changes and percentages
- Trading volume
- High/low/open/close prices
- 30-day price history chart

### AI Analysis
- Investment recommendation (BUY/SELL/HOLD)
- Confidence score
- Detailed analysis explanation
- Key supporting points
- Risk assessment with risk factors

## Limitations

- **Alpha Vantage Free Tier**: Limited to 5 API calls per minute and 500 calls per day
- **OpenAI API**: Requires paid API access (pay-as-you-go pricing)
- **Mock Data**: If API keys are not configured, the app uses mock data for demonstration

## Troubleshooting

### API Rate Limits
If you hit Alpha Vantage rate limits, the app will automatically fall back to mock data. Consider:
- Using a paid Alpha Vantage plan
- Implementing request caching
- Using alternative stock data APIs

### OpenAI API Errors
If OpenAI API calls fail, the app will use mock analysis. Ensure:
- Your API key is valid and has credits
- You have internet connectivity
- The API key is correctly set in `.env.local`

## Future Enhancements

- [ ] Portfolio tracking
- [ ] Multiple stock comparison
- [ ] Historical performance analysis
- [ ] Email alerts for price changes
- [ ] More advanced technical indicators
- [ ] News sentiment analysis
- [ ] User authentication and saved watchlists

## License

MIT License - feel free to use this project for learning and development.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

