export type CompanyRole = "MONOPOLY" | "CHALLENGER" | "PRIVATE";

export interface Company {
  ticker: string;
  name: string;
  role: CompanyRole;
  sector: string;
  country: string;
  competitors: string[];
  isPrivate?: boolean;
  esgScore?: {
    ecology: boolean;  // Supports environmental sustainability
    socialEquity: boolean;  // Reduces social inequality
  };
}

export const companies: Company[] = [
  {
    ticker: "GOOGL",
    name: "Alphabet (Google)",
    role: "MONOPOLY",
    sector: "Communication Services",
    country: "US",
    competitors: ["META", "MSFT", "AMZN", "BIDU"]
  },
  {
    ticker: "AAPL",
    name: "Apple",
    role: "MONOPOLY",
    sector: "Information Technology",
    country: "US",
    competitors: ["SSNLF", "HPQ", "DELL", "XIAOMI"]
  },
  {
    ticker: "AMZN",
    name: "Amazon",
    role: "MONOPOLY",
    sector: "Consumer Discretionary",
    country: "US",
    competitors: ["BABA", "JD", "SHOP", "WMT"]
  },
  {
    ticker: "META",
    name: "Meta Platforms",
    role: "MONOPOLY",
    sector: "Communication Services",
    country: "US",
    competitors: ["SNAP", "PINS", "BIDU", "TCEHY"]
  },
  {
    ticker: "MSFT",
    name: "Microsoft",
    role: "MONOPOLY",
    sector: "Information Technology",
    country: "US",
    competitors: ["ORCL", "IBM", "CRM", "NOW"],
    esgScore: {
      ecology: true,
      socialEquity: true
    }
  },
  {
    ticker: "NVDA",
    name: "NVIDIA",
    role: "MONOPOLY",
    sector: "Information Technology",
    country: "US",
    competitors: ["AMD", "INTC", "AVGO", "TSM"]
  },
  {
    ticker: "TSLA",
    name: "Tesla",
    role: "MONOPOLY",
    sector: "Consumer Discretionary",
    country: "US",
    competitors: ["F", "GM", "RIVN", "NIO"],
    esgScore: {
      ecology: true,
      socialEquity: false
    }
  },
  {
    ticker: "OPENAI",
    name: "OpenAI",
    role: "PRIVATE",
    sector: "Information Technology",
    country: "US",
    competitors: ["GOOGL", "MSFT", "META", "ANTHROPIC"],
    isPrivate: true
  },
  {
    ticker: "ANTHROPIC",
    name: "Anthropic",
    role: "PRIVATE",
    sector: "Information Technology",
    country: "US",
    competitors: ["OPENAI", "GOOGL", "MSFT", "META"],
    isPrivate: true
  },
  {
    ticker: "PLTR",
    name: "Palantir Technologies",
    role: "CHALLENGER",
    sector: "Information Technology",
    country: "US",
    competitors: ["SNOW", "CRM", "MSFT", "IBM"]
  },
  {
    ticker: "AI",
    name: "C3.ai",
    role: "CHALLENGER",
    sector: "Information Technology",
    country: "US",
    competitors: ["PLTR", "SNOW", "CRM", "GOOGL"]
  },
  {
    ticker: "ORCL",
    name: "Oracle",
    role: "CHALLENGER",
    sector: "Information Technology",
    country: "US",
    competitors: ["MSFT", "IBM", "SAP", "CRM"]
  },
  {
    ticker: "IBM",
    name: "IBM",
    role: "CHALLENGER",
    sector: "Information Technology",
    country: "US",
    competitors: ["MSFT", "ORCL", "HPE", "CSCO"]
  }
];
