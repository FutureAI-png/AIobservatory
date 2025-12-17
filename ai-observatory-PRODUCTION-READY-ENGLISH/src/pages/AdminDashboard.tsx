import { useState } from 'react';

interface Transaction {
  id: number;
  userId: string;
  userName: string;
  email: string;
  company: string;
  action: 'approve' | 'disapprove';
  shares: number;
  amount: number;
  broker: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
  pdfSent: boolean;
}

interface Analytics {
  totalClicks: number;
  approveClicks: number;
  disapproveClicks: number;
  totalTransactions: number;
  totalRevenue: number;
  affiliateCommissions: number;
  superPacSales: number;
}

// Mock data
const mockAnalytics: Analytics = {
  totalClicks: 1247,
  approveClicks: 823,
  disapproveClicks: 424,
  totalTransactions: 156,
  totalRevenue: 45230.50,
  affiliateCommissions: 12450.00,
  superPacSales: 8
};

const mockTransactions: Transaction[] = [
  {
    id: 1,
    userId: 'user_001',
    userName: 'María González',
    email: 'maria.g@email.com',
    company: 'Google (GOOGL)',
    action: 'approve',
    shares: 10,
    amount: 1450.00,
    broker: 'XM',
    timestamp: '2025-12-15 14:23:15',
    status: 'completed',
    pdfSent: true
  },
  {
    id: 2,
    userId: 'user_002',
    userName: 'Carlos Mendoza',
    email: 'carlos.m@email.com',
    company: 'Meta (META)',
    action: 'disapprove',
    shares: 5,
    amount: 2100.00,
    broker: 'AvaTrade',
    timestamp: '2025-12-15 13:45:32',
    status: 'completed',
    pdfSent: true
  },
  {
    id: 3,
    userId: 'user_003',
    userName: 'Ana Rodríguez',
    email: 'ana.r@email.com',
    company: 'Microsoft (MSFT)',
    action: 'approve',
    shares: 15,
    amount: 5625.00,
    broker: 'Interactive Brokers',
    timestamp: '2025-12-15 12:18:47',
    status: 'pending',
    pdfSent: false
  },
  {
    id: 4,
    userId: 'user_004',
    userName: 'Roberto Silva',
    email: 'roberto.s@email.com',
    company: 'NVIDIA (NVDA)',
    action: 'approve',
    shares: 20,
    amount: 11200.00,
    broker: 'XM',
    timestamp: '2025-12-15 11:32:21',
    status: 'completed',
    pdfSent: true
  },
  {
    id: 5,
    userId: 'user_005',
    userName: 'Laura Martínez',
    email: 'laura.m@email.com',
    company: 'Amazon (AMZN)',
    action: 'disapprove',
    shares: 8,
    amount: 1360.00,
    broker: 'AvaTrade',
    timestamp: '2025-12-15 10:15:09',
    status: 'failed',
    pdfSent: false
  }
];

export default function AdminDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [analytics] = useState<Analytics>(mockAnalytics);

  const handleSendPDF = (transactionId: number) => {
    setTransactions(prev =>
      prev.map(t =>
        t.id === transactionId ? { ...t, pdfSent: true } : t
      )
    );
    alert(`PDF de reconocimiento enviado a ${transactions.find(t => t.id === transactionId)?.email}`);
  };

  const handleAddToTracker = (transaction: Transaction) => {
    alert(`Usuario ${transaction.userName} agregado a la tabla de ${transaction.action === 'approve' ? 'Approve' : 'Disapprove'} en el Citizen Tracker`);
  };

  const companyStats = transactions.reduce((acc, t) => {
    if (!acc[t.company]) {
      acc[t.company] = { approve: 0, disapprove: 0, revenue: 0 };
    }
    if (t.action === 'approve') acc[t.company].approve += t.shares;
    else acc[t.company].disapprove += t.shares;
    acc[t.company].revenue += t.amount;
    return acc;
  }, {} as Record<string, { approve: number; disapprove: number; revenue: number }>);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-slate-400">Administration and analytics panel</p>
          </div>
          <div className="bg-red-900/20 border border-red-500 rounded-lg px-4 py-2">
            <p className="text-red-400 text-sm font-semibold">🔒 Administrators Only</p>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <p className="text-slate-400 text-sm mb-2">Total Clicks</p>
            <p className="text-3xl font-bold text-primary-400">{analytics.totalClicks.toLocaleString()}</p>
            <div className="mt-2 text-xs text-slate-500">
              <span className="text-green-400">↑ {analytics.approveClicks}</span> Approve | 
              <span className="text-red-400"> ↓ {analytics.disapproveClicks}</span> Disapprove
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <p className="text-slate-400 text-sm mb-2">Transactions</p>
            <p className="text-3xl font-bold text-green-400">{analytics.totalTransactions}</p>
            <p className="mt-2 text-xs text-slate-500">
              {transactions.filter(t => t.status === 'completed').length} completed
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <p className="text-slate-400 text-sm mb-2">Total Revenue</p>
            <p className="text-3xl font-bold text-yellow-400">
              ${analytics.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              ${analytics.affiliateCommissions.toLocaleString()} in commissions
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <p className="text-slate-400 text-sm mb-2">Super PAC Sales</p>
            <p className="text-3xl font-bold text-purple-400">{analytics.superPacSales}</p>
            <p className="mt-2 text-xs text-slate-500">Packages sold</p>
          </div>
        </div>

        {/* Company Performance */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Performance by Company</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-400 font-semibold">Company</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-semibold">Approve</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-semibold">Disapprove</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-semibold">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(companyStats).map(([company, stats]) => (
                  <tr key={company} className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="py-3 px-4 font-semibold">{company}</td>
                    <td className="py-3 px-4 text-right text-green-400">{stats.approve} shares</td>
                    <td className="py-3 px-4 text-right text-red-400">{stats.disapprove} shares</td>
                    <td className="py-3 px-4 text-right text-yellow-400">
                      ${stats.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-400 font-semibold">User</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-semibold">Company</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-semibold">Action</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-semibold">Shares</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-semibold">Amount</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-semibold">Broker</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-semibold">Status</th>
                  <th className="text-center py-3 px-4 text-slate-400 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-semibold">{transaction.userName}</p>
                        <p className="text-xs text-slate-500">{transaction.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{transaction.company}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        transaction.action === 'approve' 
                          ? 'bg-green-900/30 text-green-400' 
                          : 'bg-red-900/30 text-red-400'
                      }`}>
                        {transaction.action === 'approve' ? '👍 Approve' : '👎 Disapprove'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">{transaction.shares}</td>
                    <td className="py-3 px-4 text-right font-semibold">
                      ${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4">{transaction.broker}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        transaction.status === 'completed' ? 'bg-green-900/30 text-green-400' :
                        transaction.status === 'pending' ? 'bg-yellow-900/30 text-yellow-400' :
                        'bg-red-900/30 text-red-400'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 justify-center">
                        {!transaction.pdfSent && transaction.status === 'completed' && (
                          <button
                            onClick={() => handleSendPDF(transaction.id)}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded text-xs font-semibold"
                          >
                            Send PDF
                          </button>
                        )}
                        {transaction.pdfSent && (
                          <span className="text-green-400 text-xs">✓ PDF Sent</span>
                        )}
                        <button
                          onClick={() => handleAddToTracker(transaction)}
                          className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-xs font-semibold"
                        >
                          + Tracker
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
