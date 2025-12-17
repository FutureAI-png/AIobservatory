export interface SuperPacPackage {
  id: string;
  name: string;
  price: number;
  shares: number;
  feePercentage: number;
  feeAmount: number;
  investmentAmount: number;
  badge?: string;
  popular?: boolean;
  description: string;
}

// Calculate fee based on escal escalated structure
export function calculateFee(amount: number): { feePercentage: number; feeAmount: number; investmentAmount: number } {
  let feePercentage: number;
  
  if (amount <= 50) {
    feePercentage = 15;
  } else if (amount <= 100) {
    feePercentage = 12;
  } else if (amount <= 500) {
    feePercentage = 10;
  } else if (amount <= 1000) {
    feePercentage = 8;
  } else {
    feePercentage = 5;
  }
  
  const feeAmount = (amount * feePercentage) / 100;
  const investmentAmount = amount - feeAmount;
  
  return { feePercentage, feeAmount, investmentAmount };
}

export const SUPER_PAC_PACKAGES: SuperPacPackage[] = [
  {
    id: "bronze",
    name: "Bronze PAC",
    price: 10,
    shares: 1,
    ...calculateFee(10),
    badge: "🥉",
    description: "Start your citizen action with a small investment"
  },
  {
    id: "silver",
    name: "Silver PAC",
    price: 50,
    shares: 5,
    ...calculateFee(50),
    badge: "🥈",
    popular: true,
    description: "Most popular choice for active citizens"
  },
  {
    id: "gold",
    name: "Gold PAC",
    price: 100,
    shares: 10,
    ...calculateFee(100),
    badge: "🥇",
    description: "Make a significant impact on monopoly power"
  },
  {
    id: "diamond",
    name: "Diamond PAC",
    price: 500,
    shares: 50,
    ...calculateFee(500),
    badge: "💎",
    description: "Serious citizen investor package"
  },
  {
    id: "whale",
    name: "Whale PAC",
    price: 1000,
    shares: 100,
    ...calculateFee(1000),
    badge: "👑",
    description: "Maximum impact - for committed activists"
  }
];

export function getPackageById(id: string): SuperPacPackage | undefined {
  return SUPER_PAC_PACKAGES.find(pkg => pkg.id === id);
}

export function getRecommendedStocks(action: "REWARD" | "PENALIZE", ticker: string, companies: any[]): string[] {
  const company = companies.find(c => c.ticker === ticker);
  
  if (!company) return [];
  
  if (action === "REWARD") {
    // Support: Buy the company itself
    return [ticker];
  } else {
    // Penalize: Buy competitors
    return company.competitors.slice(0, 3);
  }
}
