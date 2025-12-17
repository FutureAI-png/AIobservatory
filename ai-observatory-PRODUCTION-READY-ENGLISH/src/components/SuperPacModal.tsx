import { useState } from "react";
import type { ActionType } from "../types";
import { SUPER_PAC_PACKAGES, getRecommendedStocks, type SuperPacPackage } from "../data/superPacPackages";
import { companies } from "../data/companies";

interface Props {
  ticker: string;
  action: ActionType;
  onClose: () => void;
}

type PaymentMethod = "stripe" | "crypto" | "paypal" | null;

export default function SuperPacModal({ ticker, action, onClose }: Props) {
  const [selectedPackage, setSelectedPackage] = useState<SuperPacPackage | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const company = companies.find((c: any) => c.ticker === ticker);
  const recommendedStocks = getRecommendedStocks(action, ticker, companies);
  
  const actionTitle = action === "REWARD" ? "Approve" : "Disapprove";
  const actionColor = action === "REWARD" ? "green" : "red";
  const actionDescription = action === "REWARD"
    ? `Vote to approve ${company?.name || ticker}. Choose your Super PAC package:`
    : `Vote to disapprove ${company?.name || ticker}. We'll buy shares of their competitors:`;

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

  const handleStripePayment = () => {
    if (!selectedPackage) return;
    
    // Track event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'super_pac_stripe_click', {
        event_category: 'monetization',
        event_label: `${ticker}_${action}_${selectedPackage.id}`
      });
    }
    
    // TODO: Integrate Stripe Checkout
    alert(`Stripe payment for ${selectedPackage.name} ($${selectedPackage.price}) - Coming soon!\n\nWe'll integrate Stripe Checkout here.`);
  };

  const handlePayPalPayment = () => {
    if (!selectedPackage) return;
    
    // Track event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'super_pac_paypal_click', {
        event_category: 'monetization',
        event_label: `${ticker}_${action}_${selectedPackage.id}`
      });
    }
    
    // TODO: Integrate PayPal
    alert(`PayPal payment for ${selectedPackage.name} ($${selectedPackage.price}) - Coming soon!\n\nWe'll integrate PayPal here.`);
  };

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-dark-900 border-2 border-primary-500/50 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className={`p-6 border-b border-${actionColor}-500/30 bg-gradient-to-r from-${actionColor}-900/20 to-transparent`}>
          <div className="flex items-start justify-between">
            <div>
              <h2 className={`text-2xl font-bold text-${actionColor}-400 mb-2`}>
                {action === "REWARD" ? "✅" : "❌"} {actionTitle} {company?.name || ticker}
              </h2>
              <p className="text-slate-300 text-sm">{actionDescription}</p>
              {action === "PENALIZE" && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {recommendedStocks.map(stock => (
                    <span key={stock} className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-xs font-mono">
                      {stock}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white text-2xl leading-none transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* Package Selection */}
        {!selectedPackage && (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-white">Choose Your Super PAC Package:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SUPER_PAC_PACKAGES.map(pkg => (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg)}
                  className={`relative p-4 rounded-xl border-2 transition-all text-left hover:scale-105 ${
                    pkg.popular
                      ? 'border-primary-500 bg-primary-500/10 shadow-lg shadow-primary-500/20'
                      : 'border-slate-700 bg-dark-800 hover:border-primary-500/50'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary-500 text-white text-xs font-bold rounded-full">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="text-3xl mb-2">{pkg.badge}</div>
                  <div className="font-bold text-lg text-white mb-1">{pkg.name}</div>
                  <div className="text-2xl font-bold text-primary-400 mb-2">${pkg.price}</div>
                  <div className="text-xs text-slate-400 mb-3">{pkg.description}</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Investment:</span>
                      <span className="font-mono">${pkg.investmentAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Service fee ({pkg.feePercentage}%):</span>
                      <span className="font-mono">${pkg.feeAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-dark-800 rounded-lg border border-slate-700">
              <h4 className="font-semibold text-white mb-2">How It Works:</h4>
              <ol className="text-sm text-slate-300 space-y-2">
                <li>1️⃣ Choose your package and payment method</li>
                <li>2️⃣ We personally buy the shares on Robinhood (same day)</li>
                <li>3️⃣ You receive legal proof of purchase via email + dashboard</li>
                <li>4️⃣ Your action appears on the Citizen Tracker sidebar</li>
              </ol>
            </div>
          </div>
        )}

        {/* Payment Method Selection */}
        {selectedPackage && !paymentMethod && (
          <div className="p-6">
            <button
              onClick={() => setSelectedPackage(null)}
              className="text-primary-400 hover:text-primary-300 text-sm mb-4 flex items-center gap-2"
            >
              ← Back to packages
            </button>
            
            <div className="mb-6 p-4 bg-dark-800 rounded-lg border border-primary-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-400">Selected Package:</div>
                  <div className="text-xl font-bold text-white">{selectedPackage.badge} {selectedPackage.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-400">Total:</div>
                  <div className="text-2xl font-bold text-primary-400">${selectedPackage.price}</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-700 text-xs text-slate-400">
                ${selectedPackage.investmentAmount.toFixed(2)} invested • ${selectedPackage.feeAmount.toFixed(2)} service fee ({selectedPackage.feePercentage}%)
              </div>
            </div>

            {/* Explicación detallada */}
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-bold text-blue-400 mb-4">📋 What Happens Next?</h4>
              <div className="space-y-3 text-sm text-slate-300">
                <p>
                  <strong className="text-white">1. Your Investment:</strong> ${selectedPackage.investmentAmount.toFixed(2)} will be used to {action === 'REWARD' ? `buy shares of ${company?.name || ticker}` : `buy shares of ${company?.name || ticker}'s competitors (${recommendedStocks.slice(0, 2).map(s => s).join(', ')})`} through regulated brokers (Interactive Brokers, XM, or AvaTrade).
                </p>
                <p>
                  <strong className="text-white">2. When:</strong> Shares are purchased within <strong>24 hours</strong> of payment confirmation during market hours (Mon-Fri, 9:30 AM - 4:00 PM EST).
                </p>
                <p>
                  <strong className="text-white">3. How You Get Paid:</strong> You receive <strong>actual shares</strong> in your name. As the stock price increases, so does your portfolio value. You can sell anytime through your broker dashboard.
                </p>
                <p>
                  <strong className="text-white">4. Service Fee:</strong> ${selectedPackage.feeAmount.toFixed(2)} ({selectedPackage.feePercentage}%) covers broker commissions, platform maintenance, and legal compliance.
                </p>
                <p>
                  <strong className="text-white">5. Proof & Recognition:</strong> You'll receive an email with:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Official proof of purchase (PDF)</li>
                  <li>Broker confirmation number</li>
                  <li>Tax documentation (1099 form)</li>
                  <li>Your name added to the Citizen Tracker</li>
                </ul>
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 w-5 h-5 text-primary-600 bg-slate-700 border-slate-600 rounded focus:ring-primary-500"
                />
                <div className="text-sm">
                  <span className="text-white font-semibold">I accept the terms and conditions</span>
                  <p className="text-slate-400 mt-1">
                    I understand that this is a real stock purchase, all transactions are legal and regulated, and I will receive actual shares that may increase or decrease in value. I acknowledge the service fee and have read the full terms.
                  </p>
                </div>
              </label>
            </div>

            <h3 className="text-lg font-semibold mb-4 text-white">Choose Payment Method:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Stripe */}
              <button
                onClick={() => termsAccepted && setPaymentMethod("stripe")}
                disabled={!termsAccepted}
                className={`p-6 rounded-xl border-2 transition-all text-center ${
                  termsAccepted
                    ? 'border-slate-700 bg-dark-800 hover:border-primary-500/50 hover:scale-105 cursor-pointer'
                    : 'border-slate-800 bg-slate-900 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="text-4xl mb-3">💳</div>
                <div className="font-bold text-white mb-2">Credit Card</div>
                <div className="text-xs text-slate-400">Visa, Mastercard, Amex</div>
                <div className="mt-3 text-xs text-green-400">✓ Instant</div>
              </button>

              {/* PayPal */}
              <button
                onClick={() => termsAccepted && setPaymentMethod("paypal")}
                disabled={!termsAccepted}
                className={`p-6 rounded-xl border-2 transition-all text-center ${
                  termsAccepted
                    ? 'border-slate-700 bg-dark-800 hover:border-primary-500/50 hover:scale-105 cursor-pointer'
                    : 'border-slate-800 bg-slate-900 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="text-4xl mb-3">🅿️</div>
                <div className="font-bold text-white mb-2">PayPal</div>
                <div className="text-xs text-slate-400">PayPal account</div>
                <div className="mt-3 text-xs text-green-400">✓ Instant</div>
              </button>

              {/* Crypto */}
              <button
                onClick={() => termsAccepted && setPaymentMethod("crypto")}
                disabled={!termsAccepted}
                className={`p-6 rounded-xl border-2 transition-all text-center ${
                  termsAccepted
                    ? 'border-slate-700 bg-dark-800 hover:border-primary-500/50 hover:scale-105 cursor-pointer'
                    : 'border-slate-800 bg-slate-900 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="text-4xl mb-3">₿</div>
                <div className="font-bold text-white mb-2">Cryptocurrency</div>
                <div className="text-xs text-slate-400">BTC, ETH, USDT</div>
                <div className="mt-3 text-xs text-yellow-400">⏱ 10-60 min</div>
              </button>
            </div>
          </div>
        )}

        {/* Payment Processing */}
        {selectedPackage && paymentMethod === "stripe" && (
          <div className="p-6">
            <button
              onClick={() => setPaymentMethod(null)}
              className="text-primary-400 hover:text-primary-300 text-sm mb-4 flex items-center gap-2"
            >
              ← Back to payment methods
            </button>
            
            <div className="text-center py-8">
              <div className="text-6xl mb-4">💳</div>
              <h3 className="text-xl font-bold text-white mb-4">Credit Card Payment</h3>
              <p className="text-slate-400 mb-6">Secure payment powered by Stripe</p>
              <button
                onClick={handleStripePayment}
                className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-primary-500/30"
              >
                Pay ${selectedPackage.price} with Stripe
              </button>
              <p className="text-xs text-slate-500 mt-4">
                Coming soon - Stripe integration in progress
              </p>
            </div>
          </div>
        )}

        {selectedPackage && paymentMethod === "paypal" && (
          <div className="p-6">
            <button
              onClick={() => setPaymentMethod(null)}
              className="text-primary-400 hover:text-primary-300 text-sm mb-4 flex items-center gap-2"
            >
              ← Back to payment methods
            </button>
            
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🅿️</div>
              <h3 className="text-xl font-bold text-white mb-4">PayPal Payment</h3>
              <p className="text-slate-400 mb-6">Fast and secure PayPal checkout</p>
              <button
                onClick={handlePayPalPayment}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-blue-500/30"
              >
                Pay ${selectedPackage.price} with PayPal
              </button>
              <p className="text-xs text-slate-500 mt-4">
                Coming soon - PayPal integration in progress
              </p>
            </div>
          </div>
        )}

        {selectedPackage && paymentMethod === "crypto" && (
          <div className="p-6">
            <button
              onClick={() => setPaymentMethod(null)}
              className="text-primary-400 hover:text-primary-300 text-sm mb-4 flex items-center gap-2"
            >
              ← Back to payment methods
            </button>
            
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-white mb-4 text-center">Cryptocurrency Payment</h3>
              <p className="text-slate-400 text-sm text-center mb-6">
                Send <span className="font-bold text-primary-400">${selectedPackage.price}</span> worth of crypto to one of these addresses:
              </p>

              <div className="space-y-4">
                {/* Bitcoin */}
                <div className="p-4 bg-dark-800 rounded-lg border border-orange-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-white">Bitcoin (BTC)</span>
                    <span className="text-xs text-slate-400">Network: Bitcoin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs bg-black/50 p-2 rounded text-orange-300 break-all">
                      {CRYPTO_WALLETS.bitcoin}
                    </code>
                    <button
                      onClick={() => handleCopyAddress(CRYPTO_WALLETS.bitcoin)}
                      className="px-3 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 rounded text-xs transition-colors"
                    >
                      {copiedAddress ? "✓" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* Ethereum */}
                <div className="p-4 bg-dark-800 rounded-lg border border-blue-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-white">Ethereum (ETH)</span>
                    <span className="text-xs text-slate-400">Network: Ethereum</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs bg-black/50 p-2 rounded text-blue-300 break-all">
                      {CRYPTO_WALLETS.ethereum}
                    </code>
                    <button
                      onClick={() => handleCopyAddress(CRYPTO_WALLETS.ethereum)}
                      className="px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded text-xs transition-colors"
                    >
                      {copiedAddress ? "✓" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* USDT */}
                <div className="p-4 bg-dark-800 rounded-lg border border-green-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-white">Tether (USDT)</span>
                    <span className="text-xs text-slate-400">Network: ERC-20</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs bg-black/50 p-2 rounded text-green-300 break-all">
                      {CRYPTO_WALLETS.usdt}
                    </code>
                    <button
                      onClick={() => handleCopyAddress(CRYPTO_WALLETS.usdt)}
                      className="px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded text-xs transition-colors"
                    >
                      {copiedAddress ? "✓" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-sm text-yellow-300 mb-2">⚠️ Important:</p>
                <ul className="text-xs text-yellow-200/80 space-y-1">
                  <li>• Send exact USD equivalent in crypto</li>
                  <li>• After sending, email transaction hash to: orders@your-domain.com</li>
                  <li>• We'll process your order within 1 hour of confirmation</li>
                  <li>• Proof of purchase sent via email</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
