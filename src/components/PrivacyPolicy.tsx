import React from 'react';
import { Shield, Clock, UserX, Mail, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-[#FF3B5C]/10 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Shield size={32} className="text-[#FF3B5C]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 font-space-grotesk">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We built GlassConversion with privacy at its core. Here's exactly what we do—and don't do—with your data.
          </p>
          <div className="mt-8 text-sm text-gray-500">
            Last updated: January 2024
          </div>
        </div>
      </section>

      {/* TikTok Compliance Statement */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-blue-50 border-y border-blue-200">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-start space-x-4">
              <CheckCircle size={24} className="text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-space-grotesk">
                  TikTok Platform Compliance
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  GlassConversion follows TikTok's platform rules. We never collect, store, or surface any data that identifies your viewers. Instead, we highlight moments of buyer interest, so you can follow up manually through TikTok's replay feature.
                </p>
                <div className="mt-4">
                  <a 
                    href="https://www.tiktok.com/legal/page/us/privacy-policy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span>View TikTok's Privacy Policy</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-16">
            
            {/* What We Collect */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 font-space-grotesk">
                What We Collect
              </h2>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p>
                  GlassConversion analyzes TikTok Live comments to help creators identify buying intent. Here's exactly what we collect:
                </p>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Your Account Information:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Email address and password</strong> - For your GlassConversion account</li>
                    <li>• <strong>TikTok handle</strong> - To identify which streams to monitor</li>
                    <li>• <strong>Billing information</strong> - Only if you upgrade to a paid plan</li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Stream Analysis Data:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Stream session metadata</strong> - Start/end times, total viewer count</li>
                    <li>• <strong>Buying intent timestamps</strong> - When potential buyers showed interest (e.g., "14:23")</li>
                    <li>• <strong>Product keywords</strong> - Words that triggered buying signals (e.g., "price", "buy", "ship")</li>
                    <li>• <strong>Product information</strong> - Details you manually input about your products</li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Usage Analytics:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Comment volume</strong> - How many comments we've analyzed for your account</li>
                    <li>• <strong>Feature usage</strong> - Which parts of the dashboard you use most</li>
                    <li>• <strong>Performance metrics</strong> - Anonymized data to improve our service</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* What We Don't Collect */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 font-space-grotesk">
                What We Never Collect
              </h2>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p>
                  To protect your viewers' privacy and keep your TikTok account safe, we deliberately avoid collecting:
                </p>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <UserX size={24} className="text-red-600" />
                    <h3 className="text-lg font-semibold text-red-900">Viewer Identity Data</h3>
                  </div>
                  <ul className="space-y-2 text-red-800">
                    <li>• <strong>TikTok usernames or user IDs</strong> - We never know who commented</li>
                    <li>• <strong>Profile pictures or bio information</strong> - No personal details stored</li>
                    <li>• <strong>Follower data or social graphs</strong> - We don't map relationships</li>
                    <li>• <strong>Direct links between viewers and comments</strong> - Comments are anonymized immediately</li>
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <AlertTriangle size={24} className="text-amber-600" />
                    <h3 className="text-lg font-semibold text-amber-900">Comment Content</h3>
                  </div>
                  <ul className="space-y-2 text-amber-800">
                    <li>• <strong>Full comment text or chat logs</strong> - Only keywords are extracted</li>
                    <li>• <strong>Private or sensitive information</strong> - Personal details are filtered out</li>
                    <li>• <strong>Comments from non-live content</strong> - Only live stream comments are processed</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <p className="text-blue-800 font-medium">
                    <strong>Why this matters:</strong> GlassConversion is designed to protect your audience's privacy—and your TikTok account. We comply fully with TikTok's platform guidelines, which means your account stays safe from policy violations.
                  </p>
                </div>
              </div>
            </div>

            {/* How We Use Your Data */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 font-space-grotesk">
                How We Use Your Data
              </h2>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p>
                  We use your data for one purpose: helping you identify buying signals during your TikTok Live streams.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Intent Analysis</h3>
                    <p className="text-gray-600">
                      Our AI analyzes comment patterns to identify phrases that indicate buying intent, like "how much?" or "where can I buy this?"
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Moment Mapping</h3>
                    <p className="text-gray-600">
                      We create timestamps showing exactly when viewers showed interest, so you know which parts of your replay to check.
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Trend Reports</h3>
                    <p className="text-gray-600">
                      We generate summaries showing your most engaging moments and which products drove the most interest.
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Account Management</h3>
                    <p className="text-gray-600">
                      We track your usage to ensure you stay within plan limits and provide customer support when needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Retention */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 font-space-grotesk">
                How Long We Keep Your Data
              </h2>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock size={24} className="text-blue-600" />
                    <h3 className="text-lg font-semibold text-blue-900">48-Hour Auto-Delete</h3>
                  </div>
                  <p className="text-blue-800 mb-4">
                    All comment-derived data is automatically deleted within 48 hours of your stream ending. No exceptions.
                  </p>
                  <div className="text-blue-700 text-sm">
                    This includes keywords, timestamps, and any temporary processing data used for analysis.
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 mb-2">What we keep permanently:</h3>
                    <ul className="text-green-800 space-y-1 text-sm">
                      <li>• Your account settings and preferences</li>
                      <li>• Anonymized analytics (like "47 buying signals detected")</li>
                      <li>• Billing records (required by law)</li>
                      <li>• Your exported reports (until you delete them)</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-semibold text-red-900 mb-2">What gets auto-deleted:</h3>
                    <ul className="text-red-800 space-y-1 text-sm">
                      <li>• All comment keywords and phrases</li>
                      <li>• Stream timestamps and viewer counts</li>
                      <li>• Any temporary processing data</li>
                      <li>• Raw analytics before anonymization</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* What We Never Do */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 font-space-grotesk">
                What We Never Do
              </h2>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <UserX size={24} className="text-red-600" />
                    <h3 className="text-lg font-semibold text-red-900">Our Privacy Promises</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-red-800">
                    <div>
                      <p className="font-medium mb-2">We never:</p>
                      <ul className="space-y-1">
                        <li>• Sell your data to anyone</li>
                        <li>• Track or profile your viewers</li>
                        <li>• Store personal information about your audience</li>
                        <li>• Share data with advertisers or marketers</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium mb-2">We never:</p>
                      <ul className="space-y-1">
                        <li>• Keep comment data long-term</li>
                        <li>• Access your TikTok account directly</li>
                        <li>• Use your data for our own marketing</li>
                        <li>• Create profiles of individual viewers</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 font-space-grotesk">
                Your Rights
              </h2>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p>
                  You own your data, and you have complete control over it:
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Access Your Data</h3>
                      <p className="text-gray-600">Download all your reports and analytics anytime from your dashboard.</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Delete Your Account</h3>
                      <p className="text-gray-600">Cancel anytime and we'll delete all your data within 30 days.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Export Everything</h3>
                      <p className="text-gray-600">Get all your historical reports as CSV files whenever you want.</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Update Preferences</h3>
                      <p className="text-gray-600">Change your email, TikTok handle, or notification settings anytime.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cookies */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 font-space-grotesk">
                Cookies & Tracking
              </h2>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p>
                  Our website uses minimal cookies to keep you logged in and remember your preferences:
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">Essential Cookies</h3>
                      <p className="text-gray-600">Keep you logged in and remember your dashboard settings. These can't be disabled.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Analytics Cookies</h3>
                      <p className="text-gray-600">Help us understand how people use our website so we can improve it. You can opt out anytime.</p>
                    </div>
                  </div>
                </div>
                <p className="mt-4">
                  <strong>No tracking cookies:</strong> We don't use cookies to track you across other websites or build advertising profiles.
                </p>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 font-space-grotesk">
                Common Questions
              </h2>
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Why can't you show me who commented?
                  </h3>
                  <div className="text-gray-700 space-y-3">
                    <p>
                      TikTok's platform rules prohibit third-party tools from collecting or storing viewer identity information. This protects your viewers' privacy and keeps your account safe from policy violations.
                    </p>
                    <p>
                      Instead of showing you usernames, we show you <strong>when</strong> buying signals happened. You can then check your TikTok replay at those exact timestamps to see who was interested and follow up directly through TikTok.
                    </p>
                    <p>
                      This approach is actually better for creators because it keeps you compliant with TikTok's rules while still helping you identify sales opportunities.
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    How do you analyze comments without storing them?
                  </h3>
                  <div className="text-gray-700 space-y-3">
                    <p>
                      We process comments in real-time during your live stream, extract buying intent signals (like keywords and timestamps), then immediately discard the original comment text.
                    </p>
                    <p>
                      Think of it like a filter: we keep the valuable insights (when someone showed interest) but throw away everything else (who said it, exact wording, personal details).
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Is this safe for my TikTok account?
                  </h3>
                  <div className="text-gray-700 space-y-3">
                    <p>
                      Yes! GlassConversion is designed specifically to comply with TikTok's platform guidelines. We don't access your account directly, store viewer data, or do anything that could trigger policy violations.
                    </p>
                    <p>
                      By focusing only on anonymized buying signals rather than personal data, we help you grow your business while keeping your account in good standing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 font-space-grotesk">
                Questions?
              </h2>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p>
                  Privacy is important to us, and we're happy to answer any questions you have about how we handle your data.
                </p>
                <div className="bg-[#FF3B5C]/5 border border-[#FF3B5C]/20 rounded-lg p-6 mt-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Mail size={24} className="text-[#FF3B5C]" />
                    <h3 className="text-lg font-semibold text-gray-900">Get in Touch</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    For any privacy-related questions or requests, email us at:
                  </p>
                  <a 
                    href="mailto:privacy@glassconversion.com"
                    className="text-[#FF3B5C] font-semibold hover:underline text-lg"
                  >
                    privacy@glassconversion.com
                  </a>
                  <p className="text-gray-600 mt-4 text-sm">
                    We typically respond within 24 hours.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-700 font-medium">
            GlassConversion is built for creators, not advertisers. Your data stays yours.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;