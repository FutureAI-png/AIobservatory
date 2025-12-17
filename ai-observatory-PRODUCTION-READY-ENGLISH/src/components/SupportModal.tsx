import { useState } from "react";

interface Props {
  onClose: () => void;
}

export default function SupportModal({ onClose }: Props) {
  const [activeTab, setActiveTab] = useState<"contact" | "privacy">("contact");

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-900 border-2 border-primary-500/40 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-primary-500/20">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
            Support & Information
          </h2>
          <button
            className="text-slate-400 hover:text-white text-3xl transition-colors"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-primary-500/20">
          <button
            className={`flex-1 py-3 px-6 font-semibold transition-colors ${
              activeTab === "contact"
                ? "bg-primary-500/20 text-primary-400 border-b-2 border-primary-400"
                : "text-slate-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("contact")}
          >
            Contact Us
          </button>
          <button
            className={`flex-1 py-3 px-6 font-semibold transition-colors ${
              activeTab === "privacy"
                ? "bg-primary-500/20 text-primary-400 border-b-2 border-primary-400"
                : "text-slate-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("privacy")}
          >
            Privacy Policy
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "contact" ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Get in Touch</h3>
                <p className="text-slate-300 mb-6">
                  We're here to help! If you have any questions, feedback, or concerns about the AI Observatory platform, please don't hesitate to reach out.
                </p>
              </div>

              <div className="bg-dark-950/50 border border-primary-500/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-primary-400 mb-4">Contact Information</h4>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">📧</div>
                    <div>
                      <div className="font-semibold text-white">Email</div>
                      <a 
                        href="mailto:aionxc@duck.com" 
                        className="text-primary-400 hover:text-primary-300 transition-colors"
                      >
                        aionxc@duck.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🏢</div>
                    <div>
                      <div className="font-semibold text-white">Organization</div>
                      <div className="text-slate-300">AIonXC</div>
                      <div className="text-sm text-slate-400">eXtreme Concentration AI Observatory</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🌐</div>
                    <div>
                      <div className="font-semibold text-white">Learn More</div>
                      <a 
                        href="https://citizen-observatory-ai-g8pmeqh.gamma.site/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-400 hover:text-primary-300 transition-colors"
                      >
                        About AIonXC & Extreme Concentration
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="text-xl">💡</div>
                  <div className="text-sm text-slate-300">
                    <strong className="text-white">Response Time:</strong> We typically respond to all inquiries within 24-48 hours. For urgent matters, please indicate "URGENT" in your subject line.
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">What We Can Help With</h4>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">•</span>
                    <span>Technical support and platform issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">•</span>
                    <span>Questions about broker integrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">•</span>
                    <span>Privacy and data protection inquiries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">•</span>
                    <span>Partnership and collaboration opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">•</span>
                    <span>Media and press inquiries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">•</span>
                    <span>General feedback and suggestions</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-bold text-white mb-4">Privacy Policy</h3>
              
              <div className="text-sm text-slate-400 mb-6">
                <strong>Last Updated:</strong> December 15, 2025
              </div>

              <div className="space-y-6 text-slate-300">
                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">1. Introduction</h4>
                  <p>
                    Welcome to the AI Observatory ("we," "our," or "us"). We are committed to protecting your privacy and ensuring transparency in how we collect, use, and safeguard your personal information. This Privacy Policy explains our practices regarding data collection and usage when you use our platform.
                  </p>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">2. Information We Collect</h4>
                  <p className="mb-3">We collect minimal information necessary to provide our services:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Usage Data:</strong> Information about how you interact with our platform, including pages visited, features used, and time spent on the site.</li>
                    <li><strong>Technical Data:</strong> IP address, browser type, device information, and operating system for security and analytics purposes.</li>
                    <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to enhance your experience and analyze platform performance.</li>
                  </ul>
                  <p className="mt-3">
                    <strong>Important:</strong> We do NOT collect or store sensitive financial information such as brokerage account credentials, portfolio holdings, or transaction details. All financial transactions are processed securely through third-party regulated brokers.
                  </p>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">3. How We Use Your Information</h4>
                  <p className="mb-3">We use collected information for the following purposes:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>To provide and maintain our platform services</li>
                    <li>To improve user experience and platform functionality</li>
                    <li>To analyze usage patterns and generate aggregated, anonymized statistics</li>
                    <li>To ensure platform security and prevent fraud</li>
                    <li>To comply with legal obligations and enforce our terms of service</li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">4. Third-Party Services & Advertising</h4>
                  <p className="mb-3">
                    Our platform uses third-party services for analytics and advertising, including <strong>Google AdSense</strong>. These services may collect information about your visits to our site and other websites to provide relevant advertisements.
                  </p>
                  <p className="mb-3">
                    <strong>Google AdSense:</strong> Google uses cookies to serve ads based on your prior visits to our website or other websites. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">Google Ads Settings</a>.
                  </p>
                  <p>
                    We also integrate with regulated brokerage platforms to facilitate investment actions. These integrations are governed by the respective broker's privacy policies and terms of service.
                  </p>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">5. Data Security</h4>
                  <p>
                    We implement industry-standard security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. All data transmissions are encrypted using SSL/TLS protocols. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">6. Your Rights (GDPR & CCPA Compliance)</h4>
                  <p className="mb-3">Depending on your location, you may have the following rights:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                    <li><strong>Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                    <li><strong>Erasure:</strong> Request deletion of your personal data (subject to legal obligations)</li>
                    <li><strong>Restriction:</strong> Request limitation of processing your data</li>
                    <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                    <li><strong>Objection:</strong> Object to processing of your data for certain purposes</li>
                    <li><strong>Opt-Out:</strong> California residents can opt-out of the sale of personal information (we do not sell personal data)</li>
                  </ul>
                  <p className="mt-3">
                    To exercise any of these rights, please contact us at <a href="mailto:aionxc@duck.com" className="text-primary-400 hover:underline">aionxc@duck.com</a>.
                  </p>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">7. Children's Privacy</h4>
                  <p>
                    Our platform is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.
                  </p>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">8. International Data Transfers</h4>
                  <p>
                    Your information may be transferred to and processed in countries other than your own. We ensure that appropriate safeguards are in place to protect your data in accordance with this Privacy Policy and applicable laws.
                  </p>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">9. Changes to This Privacy Policy</h4>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically.
                  </p>
                </section>

                <section>
                  <h4 className="text-lg font-semibold text-white mb-3">10. Contact Us</h4>
                  <p>
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
                  </p>
                  <div className="bg-dark-950/50 border border-primary-500/20 rounded-lg p-4 mt-3">
                    <p className="font-semibold text-white">AIonXC</p>
                    <p>Email: <a href="mailto:aionxc@duck.com" className="text-primary-400 hover:underline">aionxc@duck.com</a></p>
                  </div>
                </section>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-6">
                  <p className="text-sm">
                    <strong className="text-white">Your Privacy Matters:</strong> We are committed to maintaining the highest standards of data protection and transparency. If you have any concerns about how your data is handled, please don't hesitate to reach out.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-primary-500/20 p-4 bg-dark-950/50">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
