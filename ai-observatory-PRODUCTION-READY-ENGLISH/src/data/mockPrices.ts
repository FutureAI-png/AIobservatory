// Mock stock prices for development and fallback
// These will be used when Alpha Vantage API is not available

export const MOCK_STOCK_PRICES: Record<string, number> = {
  // Big Tech / AI Monopolies
  "GOOGL": 142.50,
  "AAPL": 195.71,
  "AMZN": 178.25,
  "META": 485.30,
  "MSFT": 415.20,
  "NVDA": 495.75,
  
  // Tesla
  "TSLA": 248.50,
  
  // Challengers
  "PLTR": 28.45,
  "AI": 32.80,
  "ORCL": 125.60,
  "IBM": 185.90,
  
  // Competitors
  "SSNLF": 1250.00,
  "HPQ": 35.20,
  "DELL": 95.40,
  "BABA": 88.50,
  "JD": 38.75,
  "SHOP": 78.90,
  "SNAP": 11.25,
  "PINS": 32.40,
  "BIDU": 105.80,
  "SNOW": 148.60,
  "CRM": 285.40,
  "AMD": 142.30,
  "INTC": 42.80,
  "AVGO": 168.50,
  "F": 12.45,
  "GM": 38.20,
  "RIVN": 14.80,
  "SAP": 215.60,
  "HPE": 18.90,
};

export function getMockPrice(ticker: string): number {
  return MOCK_STOCK_PRICES[ticker] || 100.00; // Default to $100 if not found
}
