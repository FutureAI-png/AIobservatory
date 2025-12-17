import { useState } from 'react';

export default function ActionExplainer() {
  const [hoveredAction, setHoveredAction] = useState<'approve' | 'disapprove' | null>(null);

  return (
    <div className="max-w-4xl mx-auto mb-12">
      <h3 className="text-2xl font-bold text-center mb-6 text-white">This is Why We Must Act</h3>
      <p className="text-center text-slate-300 mb-8">
        Extreme concentration threatens innovation, amplifies bias, and reduces transparency. Your capital can make a difference.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Approve Button with Tooltip */}
        <div 
          className="relative"
          onMouseEnter={() => setHoveredAction('approve')}
          onMouseLeave={() => setHoveredAction(null)}
        >
          <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-6 px-8 rounded-lg text-xl transition-all transform hover:scale-105 shadow-xl">
            ✅ Approve Alternatives
          </button>
          
          {hoveredAction === 'approve' && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-slate-900 border-2 border-green-500 rounded-lg p-6 shadow-2xl z-10 animate-fadeIn">
              <h4 className="text-lg font-bold text-green-400 mb-3">✅ What Does "Approve" Mean?</h4>
              <div className="text-slate-300 space-y-2 text-sm">
                <p>
                  <strong className="text-white">Reward Ethical Behavior:</strong> When you click "Approve" on a company, you're voting with your capital to <strong>buy shares</strong> of that company through regulated brokers.
                </p>
                <p>
                  <strong className="text-white">Support Innovation:</strong> Your investment supports companies that demonstrate transparency, accountability, and responsible AI development practices.
                </p>
                <p>
                  <strong className="text-white">Build Your Portfolio:</strong> You receive actual shares that can appreciate in value, providing both financial returns and social impact.
                </p>
                <p className="text-green-400 font-semibold mt-3">
                  💡 Use this for: Companies with strong ethics, open-source contributions, or challenger firms bringing healthy competition.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Disapprove Button with Tooltip */}
        <div 
          className="relative"
          onMouseEnter={() => setHoveredAction('disapprove')}
          onMouseLeave={() => setHoveredAction(null)}
        >
          <button className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold py-6 px-8 rounded-lg text-xl transition-all transform hover:scale-105 shadow-xl">
            ❌ Disapprove Monopolies
          </button>
          
          {hoveredAction === 'disapprove' && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-slate-900 border-2 border-red-500 rounded-lg p-6 shadow-2xl z-10 animate-fadeIn">
              <h4 className="text-lg font-bold text-red-400 mb-3">❌ What Does "Disapprove" Mean?</h4>
              <div className="text-slate-300 space-y-2 text-sm">
                <p>
                  <strong className="text-white">Pressure Monopolies:</strong> When you click "Disapprove" on a company, you're voting to <strong>buy shares of their competitors</strong> instead, applying market pressure.
                </p>
                <p>
                  <strong className="text-white">Diversify AI Power:</strong> Your capital flows to alternative companies, helping to break up concentration and promote a healthier, more competitive AI ecosystem.
                </p>
                <p>
                  <strong className="text-white">Send a Message:</strong> Companies track investor sentiment. Mass "Disapprove" actions signal that citizens demand change in their practices.
                </p>
                <p className="text-red-400 font-semibold mt-3">
                  💡 Use this for: Monopolistic behavior, lack of transparency, unethical AI practices, or excessive market concentration.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
