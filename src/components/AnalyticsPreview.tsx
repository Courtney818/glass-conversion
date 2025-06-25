import React from 'react';
import { TrendingUp, MessageSquare, Clock, ArrowRight, Zap } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const AnalyticsPreview: React.FC = () => {
  const { authState } = useAuth();

  const handleTikTokLogin = () => {
    // Check for dev bypass
    const isDevBypass = import.meta.env.VITE_DEV_BYPASS === 'true' && import.meta.env.DEV;
    
    if (isDevBypass) {
      window.location.hash = '#dashboard';
      window.location.reload();
    } else {
      window.location.hash = '#login';
      window.location.reload();
    }
  };

  const handleDashboardClick = () => {
    window.location.hash = '#dashboard';
    window.location.reload();
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Description */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 font-space-grotesk">
                See exactly when viewers want to buy
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Get a clear picture of engagement spikes, product mentions, and buying intent—all in one simple report.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#FF3B5C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={16} className="text-[#FF3B5C]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Intent detection</h3>
                  <p className="text-gray-600">Identify buying signals as they happen</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#FF3B5C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={16} className="text-[#FF3B5C]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Comment analysis</h3>
                  <p className="text-gray-600">Understand which messages drive sales</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {authState.isAuthenticated ? (
                <button 
                  onClick={handleDashboardClick}
                  className="flex items-center space-x-2 px-6 py-3 bg-[#FF3B5C] text-white rounded-lg hover:bg-[#E63350] transition-colors font-semibold group"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <>
                  <button 
                    onClick={handleTikTokLogin}
                    className="flex items-center space-x-3 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold group"
                    title={import.meta.env.VITE_DEV_BYPASS === 'true' && import.meta.env.DEV ? "Dev mode active – bypassing TikTok login" : ""}
                  >
                    <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                      <div className="w-3 h-3 bg-black rounded-sm"></div>
                    </div>
                    <span>Log in with TikTok</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  {/* Dev Mode Indicator */}
                  {import.meta.env.VITE_DEV_BYPASS === 'true' && import.meta.env.DEV && (
                    <div className="flex items-center space-x-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      <Zap size={14} />
                      <span>Dev mode active</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right Column - Analytics Mockup */}
          <div className="relative">
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900 font-space-grotesk">Live Report</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock size={16} />
                  <span>2 hours ago</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#FF3B5C]/5 rounded-lg p-4">
                  <div className="text-2xl font-bold text-[#FF3B5C] mb-1">103</div>
                  <div className="text-sm font-medium text-gray-700">Buying signals</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600 mb-1">47%</div>
                  <div className="text-sm font-medium text-gray-700">Peak engagement</div>
                </div>
              </div>

              {/* Heatmap */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Engagement timeline</h4>
                <div className="space-y-2">
                  {[85, 92, 67, 78, 95, 43].map((intensity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="text-xs text-gray-500 w-12">{index * 10}min</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#FF3B5C] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${intensity}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-600 w-8">{intensity}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsPreview;