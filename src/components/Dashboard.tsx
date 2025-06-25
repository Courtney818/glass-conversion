import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Clock, ArrowRight, Settings, User, Video, BookOpen, Play, ExternalLink } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showSampleStream, setShowSampleStream] = useState(false);

  const handleBackToHome = () => {
    window.location.hash = '';
    window.location.reload();
  };

  const handleConnectTikTok = () => {
    // Simulate TikTok connection
    setIsConnected(true);
  };

  const handleViewSample = () => {
    setShowSampleStream(true);
  };

  const handleReadGuide = () => {
    window.location.hash = '#help';
    window.location.reload();
  };

  // DEV ONLY – REMOVE BEFORE PRODUCTION
  const handleDevSkip = () => {
    // Skip to live dashboard state
    setIsConnected(true);
    setShowSampleStream(true);
  };

  if (showSampleStream) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-[#FF3B5C] rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                </div>
                <span className="text-xl font-bold text-gray-900 font-space-grotesk">
                  GlassConversion
                </span>
                <div className="hidden sm:flex items-center space-x-2 ml-6">
                  <span className="text-sm text-gray-600">Welcome, Creator</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Sample Data</span>
                </div>
                <button
                  onClick={() => setShowSampleStream(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Back to Setup
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Sample Dashboard Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 font-space-grotesk mb-2">
              Sample Stream Report
            </h1>
            <p className="text-lg text-gray-600">
              This is what your dashboard looks like after a live stream with buying signals.
            </p>
          </div>

          {/* Sample Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-[#FF3B5C]/10 rounded-lg flex items-center justify-center">
                  <TrendingUp size={20} className="text-[#FF3B5C]" />
                </div>
                <span className="text-sm text-gray-500">Last stream</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">47</div>
              <div className="text-sm text-gray-600">Buying signals detected</div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users size={20} className="text-blue-600" />
                </div>
                <span className="text-sm text-gray-500">Peak moment</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">23:45</div>
              <div className="text-sm text-gray-600">Highest engagement</div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <BarChart3 size={20} className="text-green-600" />
                </div>
                <span className="text-sm text-gray-500">Conversion rate</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">12%</div>
              <div className="text-sm text-gray-600">Intent to engagement</div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock size={20} className="text-purple-600" />
                </div>
                <span className="text-sm text-gray-500">Stream duration</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">1h 32m</div>
              <div className="text-sm text-gray-600">Total live time</div>
            </div>
          </div>

          {/* Sample Timeline */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-sm border border-white/20">
            <h2 className="text-2xl font-bold text-gray-900 font-space-grotesk mb-6">
              Buying Signal Timeline
            </h2>
            <div className="space-y-4">
              {[
                { time: '14:23', signal: 'High', comment: '"How much for the blue one?"', viewers: 234 },
                { time: '18:45', signal: 'Medium', comment: '"Where can I buy this?"', viewers: 189 },
                { time: '23:12', signal: 'High', comment: '"Do you ship to Canada?"', viewers: 312 },
                { time: '27:33', signal: 'High', comment: '"I need this for my wedding!"', viewers: 278 },
                { time: '31:56', signal: 'Medium', comment: '"What sizes do you have?"', viewers: 156 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm font-mono text-gray-500 w-12">{item.time}</div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.signal === 'High' 
                        ? 'bg-[#FF3B5C]/10 text-[#FF3B5C]' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.signal}
                    </div>
                    <div className="text-gray-700 italic">"{item.comment}"</div>
                  </div>
                  <div className="text-sm text-gray-500">{item.viewers} viewers</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-[#FF3B5C] rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-xl font-bold text-gray-900 font-space-grotesk">
                GlassConversion
              </span>
              <div className="hidden sm:flex items-center space-x-2 ml-6">
                <span className="text-sm text-gray-600">Welcome, Creator</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                isConnected 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  isConnected ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
                <span>{isConnected ? 'Ready to Go Live' : 'Not Connected to TikTok'}</span>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings size={20} />
              </button>
              <button
                onClick={handleBackToHome}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-12">
          
          {/* Main CTA Block */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 font-space-grotesk">
                Let's get ready to stream.
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                GlassConversion flags buyer intent while you sell. Connect TikTok to activate live scanning.
              </p>
            </div>

            {!isConnected ? (
              <div className="space-y-4">
                <button
                  onClick={handleConnectTikTok}
                  className="inline-flex items-center space-x-3 px-8 py-4 bg-[#FF3B5C] text-white rounded-xl hover:bg-[#E63350] transition-colors font-semibold text-lg shadow-lg hover:shadow-xl group"
                >
                  <Video size={24} />
                  <span>Connect Your TikTok</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button
                  onClick={() => setShowHowItWorks(!showHowItWorks)}
                  className="block mx-auto text-gray-600 hover:text-gray-900 transition-colors underline underline-offset-4"
                >
                  How does this work?
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-3 px-6 py-3 bg-green-100 text-green-800 rounded-xl">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">TikTok Connected! You're ready to go live.</span>
                </div>
                <p className="text-gray-600">
                  Start your next TikTok Live stream and we'll analyze comments in real-time.
                </p>
              </div>
            )}
          </div>

          {/* How It Works Modal/Tooltip */}
          {showHowItWorks && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 max-w-2xl mx-auto">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 font-space-grotesk">
                  How GlassConversion Works
                </h3>
                <div className="grid gap-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-[#FF3B5C] rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Stream as usual</h4>
                      <p className="text-gray-600">Go live on TikTok like you normally do. We work silently in the background.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-[#FF3B5C] rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">AI analyzes comments</h4>
                      <p className="text-gray-600">Our AI flags comments showing buying intent like "how much?" or "where to buy?"</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-[#FF3B5C] rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Get your report</h4>
                      <p className="text-gray-600">After your stream, see exactly when viewers showed interest and what drove engagement.</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowHowItWorks(false)}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Got it
                </button>
              </div>
            </div>
          )}

          {/* Secondary Actions */}
          {!showHowItWorks && (
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-4">
                <div className="h-px bg-gray-300 flex-1"></div>
                <span className="text-gray-500 text-sm">Or explore while you wait</span>
                <div className="h-px bg-gray-300 flex-1"></div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleViewSample}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-white/70 backdrop-blur-sm text-gray-700 rounded-lg hover:bg-white/90 transition-colors border border-white/20 shadow-sm group"
                >
                  <Play size={18} />
                  <span>View Sample Stream</span>
                  <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
                
                <button
                  onClick={handleReadGuide}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-white/70 backdrop-blur-sm text-gray-700 rounded-lg hover:bg-white/90 transition-colors border border-white/20 shadow-sm group"
                >
                  <BookOpen size={18} />
                  <span>Read Setup Guide</span>
                  <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

              <p className="text-sm text-gray-500">
                No TikTok login required for these previews.
              </p>
            </div>
          )}

          {/* Developer Mode - DEV ONLY */}
          <div className="pt-16 border-t border-gray-200/50">
            <button
              onClick={handleDevSkip}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors underline underline-offset-4"
            >
              Skip TikTok connection (developer access)
            </button>
            {/* // DEV ONLY – REMOVE BEFORE PRODUCTION */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;