import { useEffect, useState } from "react";
import { companies, type Company } from "../data/companies";
import CompanyCard from "./CompanyCard";
import type { ActionType } from "../types";

interface Quote {
  currentPrice: number;
  change: number;
  changePct: number;
}

type Props = {
  onAction: (ticker: string, action: ActionType) => void;
};

const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY as string | undefined;

async function fetchQuote(ticker: string): Promise<Quote | null> {
  if (!API_KEY) {
    console.warn("Missing VITE_ALPHA_VANTAGE_KEY; skipping quote fetch.");
    return null;
  }
  const url =`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=\${encodeURIComponent(
    ticker
  )}&apikey=\${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error("Alpha Vantage error", res.status, await res.text());
    return null;
  }
  const data = await res.json();
  const q = data["Global Quote"];
  if (!q || !q["05. price"]) {
    console.warn("No Global Quote for", ticker, data);
    return null;
  }
  const price = parseFloat(q["05. price"]);
  const change = parseFloat(q["09. change"] ?? "0");
  const changePctStr = (q["10. change percent"] as string | undefined) || "0%";
  const changePct = parseFloat(changePctStr.replace("%", ""));

  return {
    currentPrice: price,
    change,
    changePct
  };
}

export default function CompanyGrid({ onAction }: Props) {
  const [quotes, setQuotes] = useState<Record<string, Quote>>({});
  const [loading, setLoading] = useState<boolean>(!!API_KEY);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!API_KEY) {
      setLoading(false);
      setError(
        "No Alpha Vantage API key configured. Set VITE_ALPHA_VANTAGE_KEY to load live prices."
      );
      return;
    }

    async function loadAll() {
      try {
        const results: Record<string, Quote> = {};
        for (const c of companies) {
          // Skip API calls for private companies
          if (c.isPrivate) continue;
          
          try {
            const q = await fetchQuote(c.ticker);
            if (q) results[c.ticker] = q;
          } catch (e) {
            console.error("Failed to load quote for", c.ticker, e);
          }
        }
        setQuotes(results);
      } finally {
        setLoading(false);
      }
    }

    loadAll();
  }, []);

  return (
    <section>
      <h2 className="text-xl font-semibold mb-2 bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent">AI Concentration Tracker</h2>
      <p className="text-sm text-slate-300 mb-4">
        Live snapshot of the biggest AI players. Connect your broker via the buttons.
      </p>

      {loading && (
        <div className="text-primary-300 text-sm mb-2">
          Loading quotes from Alpha Vantage…
        </div>
      )}
      {error && <div className="text-accent-400 text-xs mb-2">{error}</div>}

      <div className="space-y-6">
        {companies.map((c: Company, index: number) => (
          <div key={c.ticker}>
            {/* Insert ad banner every 4 companies (every 2 rows) */}
            {index > 0 && index % 4 === 0 && (
              <div className="mb-6 w-full bg-dark-900/50 backdrop-blur-sm border-2 border-primary-500/30 rounded-xl p-8 flex items-center justify-center min-h-[120px]">
                <div className="text-center text-slate-300">
                  <div className="text-3xl mb-2">📢</div>
                  <p className="text-sm font-bold mb-1">Advertisement Space</p>
                  <p className="text-xs text-slate-400">728x90 or Responsive Ad</p>
                  <p className="text-xs text-primary-400 mt-1">Google AdSense / Crypto Ads / Premium Sponsors</p>
                </div>
              </div>
            )}
            
            {/* Company Cards Grid - 2 columns */}
            {index % 2 === 0 && (
              <div className="grid gap-6 md:grid-cols-2">
                <CompanyCard
                  company={c}
                  quote={quotes[c.ticker]}
                  onAction={onAction}
                  competitorQuotes={quotes}
                />
                {companies[index + 1] && (
                  <CompanyCard
                    company={companies[index + 1]}
                    quote={quotes[companies[index + 1].ticker]}
                    onAction={onAction}
                    competitorQuotes={quotes}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
