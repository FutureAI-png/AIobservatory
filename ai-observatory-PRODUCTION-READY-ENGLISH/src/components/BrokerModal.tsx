import { useState } from "react";
import type { ActionType } from "../types";
import { BROKERS, getBrokersForAction } from "../data/brokers";
import { companies } from "../data/companies";

type Props = {
  ticker: string;
  action: ActionType;
  onClose: () => void;
};

export default function BrokerModal({ ticker, action, onClose }: Props) {
  const [copiedSymbol, setCopiedSymbol] = useState(false);
  const brokers = getBrokersForAction(action);
  const company = companies.find(c => c.ticker === ticker);
  
  const actionText = action === "REWARD" 
    ? `Register & Invest in ${ticker}` 
    : `Register & Invest in ${ticker} Competitors`;
  
  const actionDescription = action === "REWARD"
    ? `Support ${company?.name || ticker} by investing directly. Quick 2-minute registration, then search for: ${ticker}`
    : `Reduce ${company?.name || ticker}'s dominance by investing in: ${company?.competitors.slice(0, 3).join(", ")}`;

  const handleCopySymbol = () => {
    const symbolText = action === "REWARD" 
      ? ticker 
      : company?.competitors.slice(0, 3).join(", ") || ticker;
    navigator.clipboard.writeText(symbolText);
    setCopiedSymbol(true);
    setTimeout(() => setCopiedSymbol(false), 2000);
  };

  const handleBrokerClick = (brokerCode: string) => {
    const broker = brokers.find(b => b.code === brokerCode);
    if (!broker) return;
    
    const url = broker.buildAffiliateUrl(ticker, action);
    
    // Track click event (Google Analytics if available)
    if ((window as any).gtag) {
      try {
        (window as any).gtag('event', 'broker_click', {
          event_category: 'affiliate',
          event_label: `${brokerCode}_${ticker}_${action}`,
          broker: brokerCode,
          ticker: ticker,
          action: action
        });
      } catch (e) {
        console.log('Analytics not available');
      }
    }
    
    // Open in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
    
    // Close modal after a short delay
    setTimeout(() => onClose(), 300);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-dark-950 border border-primary-500/40 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl shadow-primary-500/30 animate-slideUp">
        
        {/* Header - FULLY OPAQUE */}
        <div className="sticky top-0 bg-dark-950 border-b border-primary-500/40 p-5 flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-bold text-2xl mb-2 bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
              Choose Your Broker
            </h3>
            <p className="text-base text-slate-200 mb-2 font-semibold">
              {actionText}
            </p>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              {actionDescription}
            </p>
            
            {/* Copy Symbol Button */}
            <button
              onClick={handleCopySymbol}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-lg transition-colors shadow-md"
            >
              {copiedSymbol ? "✓ Copied!" : `📋 Copy Symbol: ${action === "REWARD" ? ticker : company?.competitors.slice(0, 2).join(", ")}`}
            </button>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-primary-400 text-3xl font-light w-10 h-10 flex items-center justify-center transition-colors ml-4 hover:rotate-90 transition-transform duration-300"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Content - Brokers Grid - FULLY OPAQUE */}
        <div className="p-5 overflow-y-auto max-h-[calc(90vh-250px)] bg-dark-950">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {brokers.map(broker => (
              <button
                key={broker.code}
                onClick={() => handleBrokerClick(broker.code)}
                className={`group p-4 rounded-xl border transition-all duration-300 text-left relative overflow-hidden ${
                  broker.featured
                    ? 'border-accent-500/60 bg-gradient-to-br from-accent-900/40 to-secondary-900/40 hover:border-accent-400 hover:shadow-xl hover:shadow-accent-500/40 ring-2 ring-accent-500/30'
                    : 'border-primary-500/40 bg-dark-900 hover:border-primary-500/60 hover:bg-dark-800 hover:shadow-xl hover:shadow-primary-500/30'
                } hover:-translate-y-1`}
              >
                {/* Featured Badge */}
                {broker.featured && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-accent-500 to-secondary-500 text-white text-[9px] font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
                    ⭐ TOP CHOICE
                  </div>
                )}

                {/* Broker Name + Rating */}
                <div className="flex justify-between items-start mb-3">
                  <h4 className={`font-bold text-base ${
                    broker.featured 
                      ? 'text-accent-200 group-hover:text-accent-100' 
                      : 'text-slate-100 group-hover:text-primary-200'
                  } transition-colors`}>
                    {broker.name}
                  </h4>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                    broker.featured
                      ? 'bg-accent-500/30 text-accent-200'
                      : 'bg-primary-500/30 text-primary-200'
                  }`}>
                    ⭐ {broker.rating}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-200 mb-3 leading-relaxed min-h-[2.5rem]">
                  {broker.description}
                </p>

                {/* Products */}
                <div className="mb-3 flex flex-wrap gap-1">
                  {broker.products.slice(0, 4).map(product => (
                    <span
                      key={product}
                      className="text-[10px] bg-slate-700 text-slate-200 px-2 py-0.5 rounded-full"
                    >
                      {product}
                    </span>
                  ))}
                </div>

                {/* Registration Time */}
                <div className="mb-2">
                  <p className="text-xs text-green-400 font-semibold">
                    ⚡ 2-minute registration
                  </p>
                </div>

                {/* Commission Info */}
                <div className="pt-3 border-t border-slate-700">
                  <p className="text-[10px] text-slate-400">
                    <strong className="text-slate-200">Commission:</strong> {broker.commission}
                  </p>
                </div>

                {/* CTA Button */}
                <div className={`mt-3 w-full px-3 py-2.5 text-xs font-bold rounded-lg text-center transition-all ${
                  broker.featured
                    ? 'bg-gradient-to-r from-accent-600 to-secondary-600 text-white group-hover:from-accent-500 group-hover:to-secondary-500 shadow-lg group-hover:shadow-xl'
                    : 'bg-gradient-to-r from-primary-600 to-primary-500 text-white group-hover:from-primary-500 group-hover:to-primary-400 shadow-md'
                }`}>
                  Register & Trade {ticker} →
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer - FULLY OPAQUE */}
        <div className="sticky bottom-0 bg-dark-950 border-t border-primary-500/40 p-4">
          <div className="flex items-center justify-center gap-2 text-center">
            <span className="text-2xl">💰</span>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              <strong className="text-primary-300">After registration:</strong> Search for <span className="font-mono text-accent-300">{ticker}</span> on the broker platform and start trading. 
              Trading involves risk of capital loss.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
