export interface Broker {
  code: string;
  name: string;
  description: string;
  products: string[];
  rating: number;
  commission: string;
  featured?: boolean;
  minDeposit: string;
  regTime: string;
  buildAffiliateUrl: (ticker?: string, action?: string) => string;
}

// Get environment variables
const AVATRADE_TAG = import.meta.env.VITE_AVATRADE_TAG || "217751";
const XM_ID = import.meta.env.VITE_XM_AFFILIATE_ID || "W6JYW";
const FUSION_ID = import.meta.env.VITE_FUSION_AFFILIATE_ID || "YOUR_FUSION_ID";
const VANTAGE_ID = import.meta.env.VITE_VANTAGE_AFFILIATE_ID || "YOUR_VANTAGE_ID";
const PEPPERSTONE_ID = import.meta.env.VITE_PEPPERSTONE_AFFILIATE_ID || "YOUR_PEPPER_ID";
const IC_MARKETS_ID = import.meta.env.VITE_IC_MARKETS_AFFILIATE_ID || "YOUR_IC_ID";

export const BROKERS: Broker[] = [
  {
    code: "AVATRADE",
    name: "AvaTrade",
    description: "⭐ RECOMMENDED • Regulated globally • Quick registration • Trade stocks, forex & crypto",
    products: ["Stocks", "Forex", "CFD", "Crypto", "Options"],
    rating: 4.9,
    commission: "CPA + Revenue Share",
    minDeposit: "$100",
    regTime: "2 min",
    featured: true,
    buildAffiliateUrl: (ticker, action) => {
      // AvaTrade affiliate URL with UTM tracking
      // Note: AvaTrade doesn't support direct symbol deep linking
      // User will need to search for the symbol after registration
      const url = new URL(`https://www.avatrade.com/`);
      url.searchParams.set("tag", AVATRADE_TAG);
      
      // Add UTM parameters for tracking
      url.searchParams.set("utm_source", "ai-observatory");
      url.searchParams.set("utm_medium", "affiliate");
      url.searchParams.set("utm_campaign", "ai-monopoly-tracker");
      
      // Add context parameters (for our own tracking, not used by AvaTrade)
      if (ticker) url.searchParams.set("ref_symbol", ticker);
      if (action) url.searchParams.set("ref_action", action);
      
      return url.toString();
    }
  },
  {
    code: "XM",
    name: "XM Global",
    description: "Established broker • No commission on stocks • Fast execution • 24/7 support",
    products: ["Stocks", "Forex", "CFD", "Indices", "Metals"],
    rating: 4.7,
    commission: "CPA + Revenue Share",
    minDeposit: "$5",
    regTime: "2 min",
    buildAffiliateUrl: (ticker, action) => {
      // XM prohibits deep linking per their T&C
      // Using standard referral link
      const url = new URL("https://clicks.pipaffiliates.com/c");
      url.searchParams.set("c", "398884");
      url.searchParams.set("l", "en");
      url.searchParams.set("p", "0");
      
      // Add tracking parameters
      url.searchParams.set("utm_source", "ai-observatory");
      url.searchParams.set("utm_campaign", ticker || "general");
      
      return url.toString();
    }
  },
  {
    code: "FUSION",
    name: "Fusion Markets",
    description: "Ultra-low spreads from 0.07 pips • Institutional execution • No dealing desk",
    products: ["Forex", "CFD", "Metals", "Energy", "Indices"],
    rating: 4.8,
    commission: "CPA + Revenue Share",
    minDeposit: "$0",
    regTime: "3 min",
    buildAffiliateUrl: (ticker, action) => {
      const url = new URL("https://www.fusionmarkets.com/");
      if (FUSION_ID !== "YOUR_FUSION_ID") {
        url.searchParams.set("aff_id", FUSION_ID);
      }
      url.searchParams.set("utm_source", "ai-observatory");
      if (ticker) url.searchParams.set("ref_symbol", ticker);
      return url.toString();
    }
  },
  {
    code: "VANTAGE",
    name: "Vantage Markets",
    description: "Spreads from 0.0 pips • Ultra-low latency <30ms • Multi-jurisdictional regulation",
    products: ["Forex", "CFD", "Indices", "Crypto", "Commodities"],
    rating: 4.9,
    commission: "CPA + Revenue Share",
    minDeposit: "$50",
    regTime: "2 min",
    buildAffiliateUrl: (ticker, action) => {
      const url = new URL("https://www.vantagemarkets.com/");
      if (VANTAGE_ID !== "YOUR_VANTAGE_ID") {
        url.searchParams.set("aff_id", VANTAGE_ID);
      }
      url.searchParams.set("utm_source", "ai-observatory");
      if (ticker) url.searchParams.set("ref_ticker", ticker);
      return url.toString();
    }
  },
  {
    code: "PEPPERSTONE",
    name: "Pepperstone",
    description: "True ECN • MT4/MT5/cTrader • FCA/ASIC regulated • Premium execution",
    products: ["Forex", "CFD", "Crypto", "Indices", "Commodities"],
    rating: 4.8,
    commission: "CPA + Revenue Share",
    minDeposit: "$200",
    regTime: "3 min",
    buildAffiliateUrl: (ticker, action) => {
      const url = new URL("https://www.pepperstone.com/");
      if (PEPPERSTONE_ID !== "YOUR_PEPPER_ID") {
        url.searchParams.set("aff_id", PEPPERSTONE_ID);
      }
      url.searchParams.set("utm_source", "ai-observatory");
      if (ticker) url.searchParams.set("symbol", ticker);
      return url.toString();
    }
  },
  {
    code: "IC_MARKETS",
    name: "IC Markets",
    description: "Spreads from 0.0 pips • Most affordable • ASIC regulated • Algo trading friendly",
    products: ["Forex", "CFD", "Futures", "Stocks", "Bonds"],
    rating: 4.8,
    commission: "CPA + Revenue Share",
    minDeposit: "$200",
    regTime: "2 min",
    buildAffiliateUrl: (ticker, action) => {
      const url = new URL("https://www.icmarkets.com/");
      if (IC_MARKETS_ID !== "YOUR_IC_ID") {
        url.searchParams.set("aff_id", IC_MARKETS_ID);
      }
      url.searchParams.set("utm_source", "ai-observatory");
      if (ticker) url.searchParams.set("ticker", ticker);
      return url.toString();
    }
  }
];

// Helper function to get brokers for a specific action
export function getBrokersForAction(action: "REWARD" | "PENALIZE"): Broker[] {
  // For now, return all brokers for both actions
  // You can customize this later to show different brokers for different actions
  return BROKERS;
}
