import React from 'react';
import { FileText, Users, Shield, CreditCard, AlertTriangle, RefreshCw, Mail, ExternalLink, Lock, Clock, Eye } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-[#FF3B5C]/10 rounded-xl flex items-center justify-center mx-auto mb-6">
            <FileText size={32} className="text-[#FF3B5C]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 font-space-grotesk">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple, fair terms for using GlassConversion. We believe in transparency and treating creators right.
          </p>
          <div className="mt-8 text-sm text-gray-500">
            Last updated: January 2024
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-16">
            
            {/* Welcome */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Users size={24} className="text-[#FF3B5C]" />
                <h2 className="text-3xl font-bold text-gray-900 font-space-grotesk">
                  Welcome
                </h2>
              </div>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p>
                  GlassConversion helps TikTok Live creators identify buying signals in real-time during their livestreams. We analyze comment text to flag high-intent viewers, helping you catch potential customers before they scroll away.
                </p>
                <p>
                  These terms govern your use of our service. By creating an account, you agree to these terms and our{' '}
                  <a href="#privacy" className="text-[#FF3B5C] hover:underline">Privacy Policy</a>.
                </p>
              </div>
            </div>

            {/* Platform Independence */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <ExternalLink size={24} className="text-[#FF3B5C]" />
                <h2 className="text-3xl font-bold text-gray-900 font-space-grotesk">
                  Platform Independence
                </h2>
              </div>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-start space-x-3">
                    <Shield size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">TikTok Disclaimer</h3>
                      <p className="text-blue-800 leading-relaxed">
                        GlassConversion is not affiliated with, endorsed by, or officially partnered with TikTok or ByteDance. All trademarks are property of their respective owners.
                      </p>
                      <p className="text-blue-800 mt-3">
                        We operate as an independent analytics tool that complies with TikTok's platform guidelines and terms of service.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Collection Limitations */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Lock size={24} className="text-[#FF3B5C]" />
                <h2 className="text-3xl font-bold text-gray-900 font-space-grotesk">
                  Data Collection Limitations
                </h2>
              </div>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-start space-x-3">
                    <Shield size={24} className="text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-green-900 mb-3">Privacy Protection by Design</h3>
                      <p className="text-green-800 mb-4">
                        GlassConversion does not collect or store personally identifiable information (PII) of TikTok users. This includes usernames, user IDs, profile URLs, follower data, or full comment logs.
                      </p>
                      <p className="text-green-800">
                        The platform only stores non-identifying metadata such as timestamps, intent signal strength, and product keyword matches.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 text-green-700">✓ What we collect:</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Anonymized buying intent timestamps</li>
                      <li>• Product keyword matches</li>
                      <li>• Stream session metadata</li>
                      <li>• Your account information only</li>
                    </ul>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 text-red-700">✗ What we never collect:</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• TikTok usernames or user IDs</li>
                      <li>• Profile pictures or personal data</li>
                      <li>• Full comment text or chat logs</li>
                      <li>• Viewer follower or social data</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Eligibility */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Users size={24} className="text-[#FF3B5C]" />
                <h2 className="text-3xl font-bold text-gray-900 font-space-grotesk">
                  Eligibility
                </h2>
              </div>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p>To use GlassConversion, you must:</p>
                <ul className="space-y-2">
                  <li>Be at least 18 years old</li>
                  <li>Own or have permission to monitor the TikTok Live streams you analyze</li>
                  <li>Use the service in good faith for legitimate business purposes</li>
                  <li>Comply with TikTok's Terms of Service and Community Guidelines</li>
                </ul>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
                  <p className="text-amber-800 font-medium">
                    <strong>Important:</strong> You may only analyze streams where you are the creator or have explicit permission from the creator.
                  </p>
                </div>
              </div>
            </div>

            {/* Acceptable Use */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <AlertTriangle size={24} className="text-[#FF3B5C]" />
                <h2 className="text-3xl font-bold text-gray-900 font-space-grotesk">
                  Acceptable Use
                </h2>
              </div>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p>
                  GlassConversion is designed to help creators understand their audience better. Please use it responsibly.
                </p>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-6">
                  <h3 className="text-lg font-semibold text-red-900 mb-4">Strictly Prohibited:</h3>
                  <ul className="text-red-800 space-y-2">
                    <li>• <strong>Unauthorized monitoring:</strong> Using GlassConversion to monitor other creators' livestreams without their explicit consent</li>
                    <li>• <strong>Platform circumvention:</strong> Attempting to reverse-engineer, scrape, or access TikTok's systems directly</li>
                    <li>• <strong>Data harvesting:</strong> Using the platform to attempt to identify, target, or harvest data from individual TikTok users</li>
                    <li>• <strong>Privacy violations:</strong> Any use of the platform to circumvent TikTok's privacy protections or platform terms</li>
                    <li>• <strong>Spam or harassment:</strong> Using flagged data for spam, harassment, or unsolicited marketing</li>
                    <li>• <strong>Data resale:</strong> Sharing or selling viewer data or analytics to third parties</li>
                    <li>• <strong>System abuse:</strong> Circumventing usage limits or creating multiple accounts to exceed quotas</li>
                    <li>• <strong>Illegal activities:</strong> Using the service for any illegal or harmful activities</li>
                  </ul>
                  <div className="bg-red-100 border border-red-300 rounded-lg p-4 mt-4">
                    <p className="text-red-900 font-medium">
                      <strong>Violation consequences:</strong> Any use of GlassConversion to circumvent TikTok's privacy protections or platform terms is strictly prohibited and will result in immediate account suspension.
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">Appropriate use includes:</h3>
                  <ul className="text-green-800 space-y-2">
                    <li>• Analyzing your own TikTok Live streams for business insights</li>
                    <li>• Following up with interested viewers through appropriate TikTok channels</li>
                    <li>• Using insights to improve your content and sales approach</li>
                    <li>• Exporting anonymized data for your own business records and analysis</li>
                    <li>• Sharing general performance metrics (without viewer-specific data)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Replay-Based Use */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Eye size={24} className="text-[#FF3B5C]" />
                <h2 className="text-3xl font-bold text-gray-900 font-space-grotesk">
                  Replay-Based Workflow
                </h2>
              </div>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">How Follow-Up Works</h3>
                  <p className="text-blue-800 mb-4">
                    GlassConversion is designed to highlight buyer interest moments during livestreams. Users are responsible for any follow-up or re-engagement actions performed manually using TikTok's replay features.
                  </p>
                  <p className="text-blue-800">
                    GlassConversion does not enable or automate messaging, DMs, or other forms of direct viewer communication. All follow-up must be done manually through TikTok's official features.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">📊</div>
                    <h4 className="font-semibold text-gray-900 mb-1">We provide</h4>
                    <p className="text-sm text-gray-600">Timestamps of buying signals</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">📱</div>
                    <h4 className="font-semibold text-gray-900 mb-1">You check</h4>
                    <p className="text-sm text-gray-600">Your TikTok replay at those times</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">💬</div>
                    <h4 className="font-semibold text-gray-900 mb-1">You follow up</h4>
                    <p className="text-sm text-gray-600">Manually through TikTok's features</p>
                  </div>
                </div>
              </div>
            </div>

            {/* License & Restrictions */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Shield size={24} className="text-[#FF3B5C]" />
                <h2 className="text-3xl font-bold text-gray-900 font-space-grotesk">
                  License & Restrictions
                </h2>
              </div>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Your License to Use GlassConversion</h3>
                  <p className="text-gray-700 mb-4">
                    You are granted a limited, non-transferable license to use GlassConversion solely for your own livestream operations.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900">You may:</h4>
                      <ul className="text-gray-700 space-y-1 mt-1">
                        <li>• Use the service for your own TikTok Live streams</li>
                        <li>• Export your own analytics and reports</li>
                        <li>• Share general performance insights (without viewer data)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">You may not:</h4>
                      <ul className="text-gray-700 space-y-1 mt-1">
                        <li>• Resell, redistribute, or sublicense access to the platform</li>
                        <li>• Use the service to collect user data for third parties</li>
                        <li>• Perform automated interactions or bulk data collection</li>
                        <li>• Reverse engineer or attempt to access our algorithms</li>
                        <li>• Use the service without written permission for commercial data collection</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Retention Policy */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Clock size={24} className="text-[#FF3B5C]" />
                <h2 className="text-3xl font-bold text-gray-900 font-space-grotesk">
                  Data Retention Policy
                </h2>
              </div>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock size={24} className="text-blue-600" />
                    <h3 className="text-lg font-semibold text-blue-900">Automatic Data Deletion</h3>
                  </div>
                  <p className="text-blue-800 mb-4">
                    All comment-derived session metadata is anonymized and automatically deleted within 48 hours of your stream ending.
                  </p>
                  <p className="text-blue-800">
                    You may request full deletion of your account and all associated data at any time by contacting our support team.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Automatically deleted (48 hours):</h3>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Raw comment analysis data</li>
                      <li>• Temporary processing metadata</li>
                      <li>• Session-specific timestamps</li>
                      <li>• Keyword extraction results</li>
                    </ul>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Retained (until account deletion):</h3>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Your account settings</li>
                      <li>• Anonymized performance summaries</li>
                      <li>• Billing and usage records</li>
                      <li>• Exported reports you've saved</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing & Plan Usage */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <CreditCard size={24} className="text-[#FF3B5C]" />
                <h2 className="text-3xl font-bold text-gray-900 font-space-grotesk">
                  Billing & Plan Usage
                </h2>
              </div>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p>
                  GlassConversion offers three plan types to fit different creator needs:
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Free Plan</h3>
                    <p className="text-sm text-gray-600">500 comments/month, 1 livestream/month</p>
                  </div>
                  <div className="bg-[#FF3B5C]/5 border border-[#FF3B5C]/20 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Creator Plan</h3>
                    <p className="text-sm text-gray-600">$19/month, 5,000 comments, unlimited streams</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Pro Plan</h3>
                    <p className="text-sm text-gray-600">$49/month, 20,000 comments, advanced features</p>
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  <h3 className="font-semibold text-gray-900">Billing Terms:</h3>
                  <ul className="space-y-2">
                    <li>• Comment limits reset monthly on your billing date</li>
                    <li>• Exceeding your limit may require upgrading to continue service</li>
                    <li>• Subscriptions auto-renew unless canceled before the next billing cycle</li>
                    <li>• All sales are final - no refunds for partial months</li>
                    <li>• You can upgrade or downgrade anytime with immediate effect</li>
                    <li>• Canceled accounts retain access until the end of the paid period</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                  <p className="text-yellow-800">
                    <strong>Fair Usage:</strong> We monitor for unusual usage patterns. Excessive API calls or attempts to circumvent limits may result in account suspension.
                  </p>
                </div>
              </div>
            </div>

            {/* Termination */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <AlertTriangle size={24} className="text-[#FF3B5C]" />
                <h2 className="text-3xl font-bold text-gray-900 font-space-grotesk">
                  Termination
                </h2>
              </div>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p>
                  You can cancel your account anytime from your dashboard. We may suspend or terminate accounts that:
                </p>
                <ul className="space-y-2 mt-4">
                  <li>• Violate these terms or our acceptable use policy</li>
                  <li>• Abuse the service or attempt to circumvent usage limits</li>
                  <li>• Violate TikTok's Terms of Service or Community Guidelines</li>
                  <li>• Engage in fraudulent or harmful activities</li>
                  <li>• Fail to pay subscription fees after reasonable notice</li>
                  <li>• Attempt to collect or misuse viewer personal data</li>
                </ul>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
                  <p className="text-gray-700">
                    <strong>Account Closure:</strong> When an account is terminated, all data is deleted within 30 days. You can export your analytics before closure if needed.
                  </p>
                </div>
              </div>
            </div>

            {/* Changes */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <RefreshCw size={24} className="text-[#FF3B5C]" />
                <h2 className="text-3xl font-bold text-gray-900 font-space-grotesk">
                  Changes to Terms
                </h2>
              </div>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p>
                  We may update these terms occasionally to reflect changes in our service or legal requirements. When we do:
                </p>
                <ul className="space-y-2 mt-4">
                  <li>• We'll notify you by email at least 30 days before changes take effect</li>
                  <li>• We'll show an in-app banner highlighting key changes</li>
                  <li>• The updated terms will be posted on this page with a new "last updated" date</li>
                  <li>• Continued use of the service after changes means you accept the new terms</li>
                </ul>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <p className="text-blue-800">
                    <strong>Major Changes:</strong> For significant changes that affect your rights or usage, we'll provide additional notice and may require explicit acceptance.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Mail size={24} className="text-[#FF3B5C]" />
                <h2 className="text-3xl font-bold text-gray-900 font-space-grotesk">
                  Contact & Support
                </h2>
              </div>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p>
                  Questions about these terms or need clarification on what's allowed? We're here to help.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-[#FF3B5C]/5 border border-[#FF3B5C]/20 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Mail size={24} className="text-[#FF3B5C]" />
                      <h3 className="text-lg font-semibold text-gray-900">Legal Questions</h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      For questions about these terms, acceptable use, or legal clarifications:
                    </p>
                    <a 
                      href="mailto:legal@glassconversion.com"
                      className="text-[#FF3B5C] font-semibold hover:underline text-lg"
                    >
                      legal@glassconversion.com
                    </a>
                    <p className="text-gray-600 mt-4 text-sm">
                      We typically respond to legal inquiries within 2 business days.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Users size={24} className="text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">General Support</h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      For technical support, billing questions, or general help:
                    </p>
                    <a 
                      href="mailto:support@glassconversion.com"
                      className="text-blue-600 font-semibold hover:underline text-lg"
                    >
                      support@glassconversion.com
                    </a>
                    <p className="text-gray-600 mt-4 text-sm">
                      Support team available 9am-6pm EST, Monday-Friday.
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-gray-700">
                    You can also visit our{' '}
                    <a href="#privacy" className="text-[#FF3B5C] hover:underline font-medium">Privacy Policy</a>
                    {' '}for detailed information about data handling and your rights.
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
            GlassConversion is a tool for creators, not advertisers. Use it responsibly. Respect your viewers.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfService;