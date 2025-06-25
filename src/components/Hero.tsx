import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Hero: React.FC = () => {
  const { authState } = useAuth();

  const handleTikTokLogin = () => {
    // Check for dev bypass
    const isDevBypass = import.meta.env.VITE_DEV_BYPASS === 'true' && import.meta.env.DEV;
    
    if (isDevBypass) {
      // Show dev mode tooltip and redirect to dashboard
      window.location.hash = '#dashboard';
      window.location.reload();
    } else {
      // Redirect to TikTok OAuth
      window.location.hash = '#login';
      window.location.reload();
    }
  };

  const handleDashboardClick = () => {
    window.location.hash = '#dashboard';
    window.location.reload();
  };

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-8">
          {/* Main Headline */}
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight font-space-grotesk tracking-tight">
              Catch buyers before{' '}
              <span className="text-[#FF3B5C]">they scroll away</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
              See which TikTok Live viewers are ready to buy—in real time. No guessing, no missed sales.
            </p>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Privacy-first</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Zero setup</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Works instantly</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col items-center space-y-4">
            {authState.isAuthenticated ? (
              <button 
                onClick={handleDashboardClick}
                className="px-8 py-4 bg-[#FF3B5C] text-white rounded-lg hover:bg-[#E63350] transition-colors font-semibold text-lg flex items-center space-x-2 group"
              >
                <span>Go to Dashboard</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <>
                <button 
                  onClick={handleTikTokLogin}
                  className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold text-lg flex items-center space-x-3 group shadow-lg hover:shadow-xl"
                  title={import.meta.env.VITE_DEV_BYPASS === 'true' && import.meta.env.DEV ? "Dev mode active – bypassing TikTok login" : ""}
                >
                  <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                    <div className="w-4 h-4 bg-black rounded-sm"></div>
                  </div>
                  <span>Log in with TikTok</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                {/* Dev Mode Indicator */}
                {import.meta.env.VITE_DEV_BYPASS === 'true' && import.meta.env.DEV && (
                  <div className="flex items-center space-x-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                    <Zap size={14} />
                    <span>Dev mode active – bypassing TikTok login</span>
                  </div>
                )}
                
                {/* Privacy Message */}
                <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                  We'll never message your followers or access private data. TikTok login keeps your account safe.
                </p>
              </>
            )}
          </div>

          {/* Demo Preview */}
          <div className="mt-16 relative max-w-4xl mx-auto">
            <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-[#FF3B5C] rounded-full flex items-center justify-center mx-auto">
                    <div className="w-6 h-6 bg-white rounded-sm"></div>
                  </div>
                  <p className="text-gray-600 font-medium">See GlassConversion in action</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;