import { SUPER_PAC_PACKAGES } from "../data/superPacPackages";

interface Stock {
  ticker: string;
  name: string;
  price: number;
}

interface Props {
  action: "SUPPORT" | "PENALIZE";
  stocks: Stock[];
  visible: boolean;
}

export default function ActionMenuTooltip({ action, stocks, visible }: Props) {
  if (!visible || stocks.length === 0) return null;

  const actionTitle = action === "SUPPORT" ? "Approve - Buy These Stocks" : "Disapprove - Buy Competitors";

  return (
    <div 
      className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-80 border-2 rounded-lg shadow-2xl z-50 bg-black ${action === 'SUPPORT' ? 'border-green-500' : 'border-red-500'}`}
      style={{ pointerEvents: 'none' }}
    >
      {/* Arrow */}
      <div 
        className={`absolute top-full left-1/2 -translate-x-1/2 -mt-[2px] w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent ${action === 'SUPPORT' ? 'border-t-green-500' : 'border-t-red-500'}`}
      ></div>

      {/* Header */}
      <div className={`px-4 py-2 border-b rounded-t-lg ${action === 'SUPPORT' ? 'bg-green-500/20 border-green-500/30' : 'bg-red-500/20 border-red-500/30'}`}>
        <h4 className={`font-bold text-sm mb-2 ${action === 'SUPPORT' ? 'text-green-400' : 'text-red-400'}`}>
            {action === "SUPPORT" ? "✅" : "❌"} {actionTitle}
        </h4>
        <p className="text-xs text-white leading-relaxed">
          {action === "SUPPORT" 
            ? "By approving, you invest directly in this company, supporting its growth and market position."
            : "By disapproving, you invest in their competitors, weakening their monopoly power and supporting alternatives."}
        </p>
      </div>

      {/* Content */}
      <div className="p-3 max-h-96 overflow-y-auto">
        {stocks.map((stock) => (
          <div key={stock.ticker} className="mb-4 last:mb-0">
            {/* Stock Header */}
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-bold text-white text-sm">{stock.ticker}</div>
                <div className="text-xs text-slate-400">{stock.name}</div>
              </div>
              <div className={`text-lg font-bold ${action === 'SUPPORT' ? 'text-green-400' : 'text-red-400'}`}>
                ${stock.price.toFixed(2)}
              </div>
            </div>

            {/* Package Calculations */}
            <div className="space-y-1">
              {SUPER_PAC_PACKAGES.map((pkg) => {
                const shares = pkg.investmentAmount / stock.price;
                const displayShares = shares < 1 
                  ? shares.toFixed(3) 
                  : shares.toFixed(2);

                return (
                  <div 
                    key={pkg.id}
                    className="flex items-center justify-between text-xs bg-dark-900 px-2 py-1 rounded"
                  >
                    <span className="text-slate-300">
                      {pkg.badge} {pkg.name}
                    </span>
                    <span className="font-mono text-primary-400">
                      {displayShares} shares
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Footer Info */}
        <div className="mt-3 pt-3 border-t border-slate-700">
          <p className="text-[10px] text-slate-400 text-center">
            {action === "SUPPORT" 
              ? "Your investment approves this company directly"
              : "Your investment disapproves by supporting competitors"}
          </p>
        </div>
      </div>
    </div>
  );
}
