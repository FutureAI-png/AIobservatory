import { useState, useEffect } from "react";

interface CitizenAction {
  id: string;
  timestamp: Date;
  action: "APPROVE" | "DISAPPROVE";
  ticker: string;
  companyName: string;
  amount: number;
  package: string;
}

// Mock data - Replace with real data from your backend
const MOCK_ACTIONS: CitizenAction[] = [
  {
    id: "1",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 min ago
    action: "DISAPPROVE",
    ticker: "GOOGL",
    companyName: "Google",
    amount: 100,
    package: "Gold PAC"
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 min ago
    action: "APPROVE",
    ticker: "TSLA",
    companyName: "Tesla",
    amount: 50,
    package: "Silver PAC"
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    action: "DISAPPROVE",
    ticker: "MSFT",
    companyName: "Microsoft",
    amount: 500,
    package: "Diamond PAC"
  },
  {
    id: "4",
    timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
    action: "APPROVE",
    ticker: "IBM",
    companyName: "IBM",
    amount: 10,
    package: "Bronze PAC"
  },
  {
    id: "5",
    timestamp: new Date(Date.now() - 1000 * 60 * 300), // 5 hours ago
    action: "DISAPPROVE",
    ticker: "META",
    companyName: "Meta",
    amount: 100,
    package: "Gold PAC"
  },
  {
    id: "6",
    timestamp: new Date(Date.now() - 1000 * 60 * 360), // 6 hours ago
    action: "APPROVE",
    ticker: "NVDA",
    companyName: "NVIDIA",
    amount: 1000,
    package: "Whale PAC"
  },
  {
    id: "7",
    timestamp: new Date(Date.now() - 1000 * 60 * 420), // 7 hours ago
    action: "DISAPPROVE",
    ticker: "AAPL",
    companyName: "Apple",
    amount: 50,
    package: "Silver PAC"
  }
];

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export default function CitizenTracker() {
  const [actions] = useState<CitizenAction[]>(MOCK_ACTIONS);
  const [stats, setStats] = useState({
    totalApprove: 0,
    totalDisapprove: 0,
    totalActions: 0,
    totalVolume: 0
  });

  useEffect(() => {
    // Calculate stats
    const approve = actions.filter(a => a.action === "APPROVE").length;
    const disapprove = actions.filter(a => a.action === "DISAPPROVE").length;
    const volume = actions.reduce((sum, a) => sum + a.amount, 0);
    
    setStats({
      totalApprove: approve,
      totalDisapprove: disapprove,
      totalActions: actions.length,
      totalVolume: volume
    });
  }, [actions]);

  // Separate actions by type
  const approveActions = actions.filter(a => a.action === "APPROVE");
  const disapproveActions = actions.filter(a => a.action === "DISAPPROVE");

  return (
    <div className="bg-dark-950 border-2 border-primary-500/40 rounded-xl p-4 shadow-2xl">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
          <span className="text-2xl">🏛️</span>
          Citizen Action Tracker
        </h3>
        <p className="text-xs text-slate-400">
          Real-time citizen votes on AI monopolies
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-dark-900 border border-green-500/30 rounded-lg p-2">
          <div className="text-xs text-slate-400">Approve</div>
          <div className="text-lg font-bold text-green-400">{stats.totalApprove}</div>
        </div>
        <div className="bg-dark-900 border border-red-500/30 rounded-lg p-2">
          <div className="text-xs text-slate-400">Disapprove</div>
          <div className="text-lg font-bold text-red-400">{stats.totalDisapprove}</div>
        </div>
        <div className="col-span-2 bg-dark-900 border border-primary-500/30 rounded-lg p-2">
          <div className="text-xs text-slate-400">Total Volume</div>
          <div className="text-xl font-bold text-primary-400">${stats.totalVolume.toLocaleString()}</div>
        </div>
      </div>

      {/* Two-Lane Layout */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {/* Approve Lane Header */}
        <div className="text-center">
          <div className="text-xs font-bold text-green-400 mb-1">✅ Approve</div>
        </div>
        {/* Disapprove Lane Header */}
        <div className="text-center">
          <div className="text-xs font-bold text-red-400 mb-1">❌ Disapprove</div>
        </div>
      </div>

      {/* Two-Lane Actions */}
      <div className="grid grid-cols-2 gap-2 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-primary-500/30 scrollbar-track-dark-900">
        {/* Approve Lane */}
        <div className="space-y-2">
          {approveActions.map((action) => (
            <div
              key={action.id}
              className="p-2 rounded-lg border bg-green-500/5 border-green-500/30 hover:border-green-500/50 transition-all hover:scale-[1.02]"
            >
              <div className="flex items-center gap-1 mb-1">
                <span className="text-sm">✅</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-xs truncate">
                    {action.companyName}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {action.ticker}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-green-400">${action.amount}</span>
                <span className="text-slate-500">{formatTimeAgo(action.timestamp)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Disapprove Lane */}
        <div className="space-y-2">
          {disapproveActions.map((action) => (
            <div
              key={action.id}
              className="p-2 rounded-lg border bg-red-500/5 border-red-500/30 hover:border-red-500/50 transition-all hover:scale-[1.02]"
            >
              <div className="flex items-center gap-1 mb-1">
                <span className="text-sm">❌</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-xs truncate">
                    {action.companyName}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {action.ticker}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-red-400">${action.amount}</span>
                <span className="text-slate-500">{formatTimeAgo(action.timestamp)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-4 p-3 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/30 rounded-lg">
        <p className="text-xs text-center text-slate-300">
          <span className="font-bold text-primary-400">Join the movement!</span>
          <br />
          Vote with your capital today
        </p>
      </div>

      {/* Info */}
      <div className="mt-3 text-[10px] text-slate-500 text-center">
        Updates every 30 seconds
      </div>
    </div>
  );
}
