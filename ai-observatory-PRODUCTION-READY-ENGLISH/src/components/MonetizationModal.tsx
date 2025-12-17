import { useState } from "react";
import type { ActionType } from "../types";
import { companies } from "../data/companies";

type Props = {
  ticker: string;
  action: ActionType;
  onClose: () => void;
};

type MonetizationOption = "adsense" | "crypto" | "premium";

export default function MonetizationModal({ ticker, action, onClose }: Props) {
  const [selectedOption, setSelectedOption] = useState<MonetizationOption | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  
  const company = companies.find(c => c.ticker === ticker);
  
  const actionText = action === "REWARD" 
    ? `Support ${company?.name || ticker}` 
    : `Penalize ${company?.name || ticker}`;
  
  const actionDescription = action === "REWARD"
    ? `Vote with your capital to support ${company?.name || ticker}. Choose how you want to participate:`
    : `Vote with your capital against ${company?.name || ticker}'s monopoly. Choose how you want to participate:`;

  // Crypto wallet addresses from environment variables
  const CRYPTO_WALLETS = {
    bitcoin: import.meta.env.VITE_CRYPTO_BTC_ADDRESS || "YOUR_BITCOIN_ADDRESS_HERE",
    ethereum: import.meta.env.VITE_CRYPTO_ETH_ADDRESS || "YOUR_ETHEREUM_ADDRESS_HERE",
    usdt: import.meta.env.VITE_CRYPTO_USDT_ADDRESS || "YOUR_USDT_ERC20_ADDRESS_HERE"
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleAdSenseClick = () => {
    // Track AdSense click
    if ((window as any).gtag) {
      (window as any).gtag('event', 'adsense_click', {
        event_category: 'monetization',
        event_label: `${ticker}_${action}`,
        ticker: ticker,
        action: action
      });
    }
    
    // In production, this would show actual AdSense ads
    // For now, we'll simulate the click
    alert('AdSense ad would appear here. You earn $0.50-$2 per click!');
  };

  const handlePremiumClick = () => {
    // Track premium click
    if ((window as any).gtag) {
      (window as any).gtag('event', 'premium_click', {
        event_category: 'monetization',
        event_label: `${ticker}_${action}`
      });
    }
    
    // Redirect to Patreon or payment page
    const patreonUrl = import.meta.env.VITE_PATREON_URL || 'https://www.patreon.com/YOUR_PAGE';
    window.open(patreonUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-dark-950 border-2 border-primary-500/50 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl shadow-primary-500/30 animate-slideUp">
        
        {/* Header - FULLY OPAQUE */}
        <div className="bg-dark-950 border-b-2 border-primary-500/50 p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-black text-3xl mb-3 bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
                {actionText}
              </h3>
              <p className="text-lg text-slate-100 leading-relaxed mb-2">
                {actionDescription}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-600/30 border border-primary-500/50 rounded-lg">
                <span className="font-mono text-accent-300 font-bold text-lg">{ticker}</span>
                <span className="text-slate-300 text-sm">• {company?.name}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-300 hover:text-primary-400 text-4xl font-light w-12 h-12 flex items-center justify-center transition-colors hover:rotate-90 transition-transform duration-300"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content - THREE MONETIZATION OPTIONS - FULLY OPAQUE */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)] bg-dark-950">
          <div className="grid gap-4 md:grid-cols-3">
            
            {/* OPTION 1: GOOGLE ADSENSE */}
            <button
              onClick={() => {
                setSelectedOption("adsense");
                handleAdSenseClick();
              }}
              className="group p-6 rounded-xl border-2 border-green-500/50 bg-gradient-to-br from-green-900/40 to-emerald-900/40 hover:border-green-400 hover:shadow-2xl hover:shadow-green-500/40 transition-all duration-300 text-left hover:-translate-y-2"
            >
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">📊</div>
                <h4 className="font-black text-xl text-green-300 mb-2">
                  View Sponsored Content
                </h4>
                <div className="text-3xl font-black text-green-400 mb-1">
                  FREE
                </div>
                <p className="text-xs text-green-200">
                  You help us earn $0.50-$2
                </p>
              </div>
              
              <ul className="space-y-2 mb-4 text-sm text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>View relevant ads</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Support the platform</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>No cost to you</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Instant contribution</span>
                </li>
              </ul>

              <div className="mt-4 w-full px-4 py-3 text-sm font-bold bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-center group-hover:from-green-500 group-hover:to-emerald-500 shadow-lg">
                Click to View Ads →
              </div>
            </button>

            {/* OPTION 2: CRYPTO DONATION */}
            <button
              onClick={() => setSelectedOption("crypto")}
              className="group p-6 rounded-xl border-2 border-accent-500/50 bg-gradient-to-br from-accent-900/40 to-secondary-900/40 hover:border-accent-400 hover:shadow-2xl hover:shadow-accent-500/40 transition-all duration-300 text-left hover:-translate-y-2 ring-2 ring-accent-500/30"
            >
              <div className="absolute top-3 right-3 bg-gradient-to-r from-accent-500 to-secondary-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
                ⚡ INSTANT
              </div>

              <div className="text-center mb-4">
                <div className="text-5xl mb-2">₿</div>
                <h4 className="font-black text-xl text-accent-300 mb-2">
                  Crypto Donation
                </h4>
                <div className="text-3xl font-black text-accent-400 mb-1">
                  $1-$100+
                </div>
                <p className="text-xs text-accent-200">
                  Direct to our wallet
                </p>
              </div>
              
              <ul className="space-y-2 mb-4 text-sm text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="text-accent-400">✓</span>
                  <span>Instant payment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-400">✓</span>
                  <span>Bitcoin, ETH, USDT</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-400">✓</span>
                  <span>No intermediaries</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-400">✓</span>
                  <span>100% goes to us</span>
                </li>
              </ul>

              <div className="mt-4 w-full px-4 py-3 text-sm font-bold bg-gradient-to-r from-accent-600 to-secondary-600 text-white rounded-lg text-center group-hover:from-accent-500 group-hover:to-secondary-500 shadow-lg">
                Donate Crypto →
              </div>
            </button>

            {/* OPTION 3: PREMIUM MEMBERSHIP */}
            <button
              onClick={() => {
                setSelectedOption("premium");
                handlePremiumClick();
              }}
              className="group p-6 rounded-xl border-2 border-primary-500/50 bg-gradient-to-br from-primary-900/40 to-purple-900/40 hover:border-primary-400 hover:shadow-2xl hover:shadow-primary-500/40 transition-all duration-300 text-left hover:-translate-y-2"
            >
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">👑</div>
                <h4 className="font-black text-xl text-primary-300 mb-2">
                  Premium Member
                </h4>
                <div className="text-3xl font-black text-primary-400 mb-1">
                  $5/month
                </div>
                <p className="text-xs text-primary-200">
                  Recurring revenue for us
                </p>
              </div>
              
              <ul className="space-y-2 mb-4 text-sm text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="text-primary-400">✓</span>
                  <span>Real-time price alerts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-400">✓</span>
                  <span>Exclusive analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-400">✓</span>
                  <span>Portfolio tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-400">✓</span>
                  <span>Ad-free experience</span>
                </li>
              </ul>

              <div className="mt-4 w-full px-4 py-3 text-sm font-bold bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-lg text-center group-hover:from-primary-500 group-hover:to-purple-500 shadow-lg">
                Go Premium →
              </div>
            </button>
          </div>

          {/* CRYPTO DONATION DETAILS */}
          {selectedOption === "crypto" && (
            <div className="mt-6 p-6 bg-dark-900 border-2 border-accent-500/50 rounded-xl animate-slideUp">
              <h5 className="font-bold text-xl text-accent-300 mb-4">
                Send Crypto to Support {actionText}
              </h5>
              
              <div className="space-y-4">
                {/* Bitcoin */}
                <div className="p-4 bg-dark-950 border border-accent-500/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-100">Bitcoin (BTC)</span>
                    <span className="text-xs text-accent-400">Recommended</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs bg-black/50 px-3 py-2 rounded text-slate-300 font-mono break-all">
                      {CRYPTO_WALLETS.bitcoin}
                    </code>
                    <button
                      onClick={() => handleCopyAddress(CRYPTO_WALLETS.bitcoin)}
                      className="px-3 py-2 bg-accent-600 hover:bg-accent-500 text-white text-xs font-bold rounded transition-colors"
                    >
                      {copiedAddress ? "✓" : "📋"}
                    </button>
                  </div>
                </div>

                {/* Ethereum */}
                <div className="p-4 bg-dark-950 border border-accent-500/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-100">Ethereum (ETH)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs bg-black/50 px-3 py-2 rounded text-slate-300 font-mono break-all">
                      {CRYPTO_WALLETS.ethereum}
                    </code>
                    <button
                      onClick={() => handleCopyAddress(CRYPTO_WALLETS.ethereum)}
                      className="px-3 py-2 bg-accent-600 hover:bg-accent-500 text-white text-xs font-bold rounded transition-colors"
                    >
                      {copiedAddress ? "✓" : "📋"}
                    </button>
                  </div>
                </div>

                {/* USDT */}
                <div className="p-4 bg-dark-950 border border-accent-500/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-100">Tether (USDT)</span>
                    <span className="text-xs text-green-400">Stablecoin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs bg-black/50 px-3 py-2 rounded text-slate-300 font-mono break-all">
                      {CRYPTO_WALLETS.usdt}
                    </code>
                    <button
                      onClick={() => handleCopyAddress(CRYPTO_WALLETS.usdt)}
                      className="px-3 py-2 bg-accent-600 hover:bg-accent-500 text-white text-xs font-bold rounded transition-colors"
                    >
                      {copiedAddress ? "✓" : "📋"}
                    </button>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-400 text-center">
                💰 Any amount helps! Suggested: $1, $5, $10, $50, $100
              </p>
            </div>
          )}
        </div>

        {/* Footer - FULLY OPAQUE */}
        <div className="bg-dark-950 border-t-2 border-primary-500/50 p-4">
          <div className="text-center">
            <p className="text-sm text-slate-300 leading-relaxed">
              <strong className="text-primary-300">Your vote matters!</strong> Every click, donation, or membership helps us track AI monopolies and empower citizens.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
