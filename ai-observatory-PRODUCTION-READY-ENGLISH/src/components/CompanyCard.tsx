import { useState } from "react";
import type { ActionType } from "../types";
import type { Company } from "../data/companies";
import ActionMenuTooltip from "./ActionMenuTooltip";
import { getMockPrice } from "../data/mockPrices";

interface Quote {
  currentPrice: number;
  change: number;
  changePct: number;
}

type Props = {
  company: Company;
  quote?: Quote;
  onAction: (ticker: string, action: ActionType) => void;
  competitorQuotes?: Record<string, Quote>;
};

export default function CompanyCard({ company, quote, onAction, competitorQuotes = {} }: Props) {
  const [copied, setCopied] = useState(false);
  const [supportHover, setSupportHover] = useState(false);
  const [penalizeHover, setPenalizeHover] = useState(false);

  const changeColor =
    quote && quote.changePct > 0
      ? "text-primary-400"
      : quote && quote.changePct < 0
      ? "text-rose-400"
      : "text-slate-300";

  const roleBadgeColor = 
    company.role === "MONOPOLY" 
      ? "border-secondary-500/50 bg-secondary-500/10 text-secondary-300"
      : company.role === "PRIVATE"
      ? "border-accent-500/50 bg-accent-500/10 text-accent-300"
      : "border-primary-500/50 bg-primary-500/10 text-primary-300";

  const handleCopySymbol = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(company.ticker);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Prepare stocks for Support action (buy this company)
  const supportStocks = !company.isPrivate ? [{
    ticker: company.ticker,
    name: company.name,
    price: quote?.currentPrice || getMockPrice(company.ticker)
  }] : [];

  // Prepare stocks for Penalize action (buy competitors)
  const penalizeStocks = company.competitors
    .slice(0, 3) // Top 3 competitors
    .map(ticker => {
      const competitorQuote = competitorQuotes[ticker];
      
      return {
        ticker,
        name: ticker, // Could be enhanced with full company names
        price: competitorQuote?.currentPrice || getMockPrice(ticker)
      };
    });

  return (
    <article className="bg-dark-900/90 backdrop-blur-sm rounded-xl border border-primary-500/20 p-4 shadow-lg shadow-primary-500/5 hover:shadow-primary-500/10 transition-all hover:border-primary-500/40">
      <div className="mb-3">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-semibold text-lg flex-1">
            {company.name}{" "}
          </h3>
          <div className="flex gap-1 flex-wrap justify-end">
            <span className={`text-[10px] px-2 py-1 rounded-full border ${roleBadgeColor}`}>
              {company.role === "MONOPOLY" ? "AI MONOPOLY" : company.role === "PRIVATE" ? "PRIVATE" : "CHALLENGER"}
            </span>
            {company.esgScore?.ecology && (
              <span className="text-[10px] px-2 py-1 rounded-full border border-green-500/50 bg-green-500/10 text-green-300">
                🌱 ECO
              </span>
            )}
            {company.esgScore?.socialEquity && (
              <span className="text-[10px] px-2 py-1 rounded-full border border-blue-500/50 bg-blue-500/10 text-blue-300">
                🤝 EQUITY
              </span>
            )}
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          {company.sector} • {company.country}
        </p>
      </div>

      <div className="flex items-center justify-between mb-3">
        <button
          onClick={handleCopySymbol}
          title="Copy ticker symbol"
          className="flex items-center gap-1 px-2 py-1 bg-dark-950/80 rounded text-xs font-mono text-primary-300 hover:text-primary-200 transition-colors"
        >
          {company.ticker} {copied ? "✓" : "📋"}
        </button>
      </div>

      <div className="mb-3 pb-3 border-b border-primary-500/10">
        {company.isPrivate ? (
          <div className="text-center py-2">
            <div className="text-2xl font-bold text-accent-400">—</div>
            <div className="text-xs text-slate-400 mt-1">
              Private company - Not publicly traded
            </div>
          </div>
        ) : quote ? (
          <>
            <div className="text-2xl font-bold">${quote.currentPrice.toFixed(2)}</div>
            <div className={`text-sm ${changeColor}`}>
              {quote.change >= 0 ? "+" : ""}
              {quote.change.toFixed(2)} ({quote.changePct >= 0 ? "+" : ""}
              {quote.changePct.toFixed(2)}%)
            </div>
          </>
        ) : (
          <div className="text-center py-2">
            <div className="text-2xl font-bold text-slate-500">—</div>
            <div className="text-xs text-slate-400 mt-1">
              Price not loaded yet or API limit reached.
            </div>
          </div>
        )}
      </div>

      <div className="text-xs text-slate-400 mb-3">
        Main competitors: {company.competitors.slice(0, 3).join(", ")}…
      </div>

      <div className="flex gap-2 mt-auto">
        {/* Support Button - GREEN with Action Menu Tooltip */}
        <div 
          className="relative flex-1 group"
          onMouseEnter={() => setSupportHover(true)}
          onMouseLeave={() => setSupportHover(false)}
        >
          <button
            onClick={() => onAction(company.ticker, "REWARD")}
            className="w-full text-xs font-semibold py-2 rounded-lg bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white transition-all shadow-md hover:shadow-lg hover:shadow-green-500/30"
          >
            👍 Approve
          </button>
          <ActionMenuTooltip
            action="SUPPORT"
            stocks={supportStocks}
            visible={supportHover}
          />
        </div>

        {/* Penalize Button - RED with Action Menu Tooltip */}
        <div 
          className="relative flex-1 group"
          onMouseEnter={() => setPenalizeHover(true)}
          onMouseLeave={() => setPenalizeHover(false)}
        >
          <button
            onClick={() => onAction(company.ticker, "PENALIZE")}
            className="w-full text-xs font-semibold py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white transition-all shadow-md hover:shadow-lg hover:shadow-red-500/30"
          >
            👎 Disapprove
          </button>
          <ActionMenuTooltip
            action="PENALIZE"
            stocks={penalizeStocks}
            visible={penalizeHover}
          />
        </div>
      </div>
    </article>
  );
}
