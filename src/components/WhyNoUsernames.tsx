import React from 'react';
import { Shield, Eye, MessageSquare, TrendingUp } from 'lucide-react';

const WhyNoUsernames: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Main Explanation */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 font-space-grotesk">
            "Where are the usernames?"
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            You might wonder why we don't show who made each comment. The reason's simple: TikTok doesn't allow tools like ours to store user info. And that protects <em>your</em> account too.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Shield size={24} className="text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 font-space-grotesk">
              We don't store usernames, IDs, or profile links
            </h3>
            <p className="text-gray-600">
              Your viewers stay anonymous and protected
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <MessageSquare size={24} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 font-space-grotesk">
              We don't send messages or track viewers
            </h3>
            <p className="text-gray-600">
              No spam, no creepy following, no privacy violations
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Eye size={24} className="text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 font-space-grotesk">
              We just highlight the <em>moments</em> you should rewatch
            </h3>
            <p className="text-gray-600">
              See exactly when buying signals happened in your stream
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-[#FF3B5C]/10 rounded-xl flex items-center justify-center mx-auto mb-6">
              <TrendingUp size={24} className="text-[#FF3B5C]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 font-space-grotesk">
              You follow up from inside TikTok—where you already know who commented
            </h3>
            <p className="text-gray-600">
              Use your stream replay to connect with interested viewers
            </p>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-900 mb-4 font-space-grotesk">
            You stay safe. Your audience stays private. And your sales go up.
          </p>
        </div>

        {/* Callout Banner */}
        <div className="bg-[#FF3B5C]/5 border border-[#FF3B5C]/20 rounded-2xl p-8 mt-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-[#FF3B5C] rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield size={24} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-space-grotesk">
              No usernames. No shady scraping. Just moments that make you money.
            </h3>
            <p className="text-lg text-gray-700">
              GlassConversion is built for sellers—not spam bots.
            </p>
          </div>
        </div>

        {/* FAQ Item */}
        <div className="bg-gray-50 rounded-2xl p-8 mt-12">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4 font-space-grotesk">
              Can't you just save who commented?
            </h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Nope—and that's a good thing. TikTok prohibits third-party tools from saving your viewers' identity. If we did that, your account could get flagged.
              </p>
              <p>
                Instead, we track what matters most: <strong>when someone showed buying intent.</strong>
              </p>
              <p>
                Then we help you follow up from <em>your own replay.</em> No privacy risk. No rule-breaking.
              </p>
            </div>
          </div>
        </div>

        {/* Visual Flow */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12 font-space-grotesk">
            Here's how it actually works:
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl">💬</div>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Buyer moment detected</h4>
              <p className="text-gray-600 text-sm">
                "How much is this?" at 14:23 in your stream
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl">📱</div>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Check your TikTok replay</h4>
              <p className="text-gray-600 text-sm">
                Go to 14:23 and see who was asking about price
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl">💰</div>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Follow up and close</h4>
              <p className="text-gray-600 text-sm">
                Reply to their comment or send a DM with details
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyNoUsernames;