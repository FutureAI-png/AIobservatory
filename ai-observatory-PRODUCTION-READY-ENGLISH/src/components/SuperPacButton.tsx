import { useState } from 'react';

export default function SuperPacButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-2xl"
      >
        Join the Super PAC
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-slate-900 rounded-lg max-w-5xl w-full my-8">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white">Join the Citizen Super PAC</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white text-4xl font-bold leading-none w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-800 transition-all"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              {/* Explicación principal */}
              <div className="bg-gradient-to-r from-primary-900/30 to-purple-900/30 border border-primary-500/30 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-primary-400 mb-4">How It Works - 100% Legal & Transparent</h3>
                <div className="space-y-3 text-slate-300">
                  <p>
                    <strong className="text-white">🏦 Professional Brokers:</strong> All stock purchases are executed through the world's most reputable and regulated brokers and trading platforms, including Interactive Brokers, XM, and AvaTrade. These are licensed, insured, and compliant with international financial regulations.
                  </p>
                  <p>
                    <strong className="text-white">⚖️ 100% Legal:</strong> Every transaction is fully legal and transparent. You receive official proof of purchase, tax documentation, and your action is publicly recognized in our Citizen Tracker. We operate under strict compliance with SEC regulations and international trading laws.
                  </p>
                  <p>
                    <strong className="text-white">🌍 Intelligent Investing for the Planet:</strong> The XC AI Observatory empowers you to invest intelligently in the stock market while acting in benefit of ecological sustainability and social equity. By supporting companies that prioritize environmental responsibility and fair labor practices, your capital becomes a force for positive change.
                  </p>
                  <p>
                    <strong className="text-white">💡 Why It Matters:</strong> Extreme concentration of AI power in a few corporations threatens innovation, amplifies bias, and reduces transparency. Your capital can make a real difference by:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li><strong>Rewarding ethical AI companies</strong> that prioritize transparency and accountability</li>
                    <li><strong>Pressuring monopolies</strong> by investing in their competitors when they act irresponsibly</li>
                    <li><strong>Supporting challengers</strong> that bring diversity and innovation to the AI ecosystem</li>
                    <li><strong>Building a democratic movement</strong> of citizens who vote with their capital</li>
                  </ul>
                </div>
              </div>

              {/* Paquetes */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">Choose Your Package</h3>
                <p className="text-slate-400 mb-6">
                  Select a package to start your citizen action. All packages include:
                </p>
                <div className="grid md:grid-cols-3 gap-3 mb-6">
                  <div className="bg-slate-800 border border-slate-700 rounded p-3 text-sm">
                    <div className="text-green-400 font-semibold mb-1">✓ Proof of Purchase</div>
                    <div className="text-slate-400">Official documentation and tax receipts</div>
                  </div>
                  <div className="bg-slate-800 border border-slate-700 rounded p-3 text-sm">
                    <div className="text-green-400 font-semibold mb-1">✓ Public Recognition</div>
                    <div className="text-slate-400">Your action appears in the Citizen Tracker</div>
                  </div>
                  <div className="bg-slate-800 border border-slate-700 rounded p-3 text-sm">
                    <div className="text-green-400 font-semibold mb-1">✓ Impact Dashboard</div>
                    <div className="text-slate-400">Track your portfolio and social impact</div>
                  </div>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 text-center">
                  <p className="text-yellow-300 font-semibold mb-2">📊 Coming Soon!</p>
                  <p className="text-slate-300 text-sm">
                    Super PAC packages are currently being finalized. Use the <strong>Approve/Disapprove buttons</strong> on individual companies below to take immediate action and invest through our broker partners.
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-4 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                  >
                    Browse Companies
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
