import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Hero: React.FC = () => {
  const { authState } = useAuth();

  const handleGetStartedClick = () => {
    if (authState.isAuthenticated) {
      window.location.hash = '#dashboard';
    } else {
      window.location.hash = '#login';
    }
    window.location.reload();
  };

  const handleLoginClick = () => {
    window.location.hash = '#login';
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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={handleGetStartedClick}
              className="px-8 py-4 bg-[#FF3B5C] text-white rounded-lg hover:bg-[#E63350] transition-colors font-semibold text-lg flex items-center space-x-2 group"
            >
              <span>{authState.isAuthenticated ? 'Go to Dashboard' : 'Start free'}</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            {!authState.isAuthenticated && (
              <button 
                onClick={handleLoginClick}
                className="flex items-center space-x-2 px-8 py-4 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                <span>Login</span>
              </button>
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