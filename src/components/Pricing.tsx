import React from 'react';
import { Check, ArrowRight, Zap } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Pricing: React.FC = () => {
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

  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Test the waters',
      features: [
        '500 comments/month',
        '1 livestream/month',
        'Basic intent detection',
        'Simple report'
      ],
      buttonText: 'Log in with TikTok',
      primary: false
    },
    {
      name: 'Creator',
      price: '$19',
      description: 'For active sellers',
      features: [
        '5,000 comments/month',
        'Unlimited livestreams',
        'Full intent detection',
        'Detailed reports',
        'CSV export',
        'Email support'
      ],
      buttonText: 'Log in with TikTok',
      primary: true
    },
    {
      name: 'Pro',
      price: '$49',
      description: 'For power users',
      features: [
        '20,000 comments/month',
        'Auto-tagging',
        'Advanced analytics',
        'Priority support',
        'Custom reports'
      ],
      buttonText: 'Contact us',
      primary: false
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 font-space-grotesk">
            Simple pricing
          </h2>
          <p className="text-xl text-gray-600">
            Start free. Upgrade when you're ready to scale.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div key={plan.name} className={`bg-white rounded-xl p-8 ${
              plan.primary ? 'ring-2 ring-[#FF3B5C] shadow-lg' : 'border shadow-sm'
            }`}>
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 font-space-grotesk">
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {plan.price}<span className="text-lg text-gray-600">/mo</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check size={16} className="text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {authState.isAuthenticated ? (
                <button 
                  onClick={handleDashboardClick}
                  className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 group ${
                    plan.primary 
                      ? 'bg-[#FF3B5C] text-white hover:bg-[#E63350]' 
                      : 'border text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button 
                  onClick={plan.name === 'Pro' ? undefined : handleTikTokLogin}
                  className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 group ${
                    plan.primary 
                      ? 'bg-black text-white hover:bg-gray-800' 
                      : plan.name === 'Pro'
                      ? 'border text-gray-700 hover:bg-gray-50'
                      : 'border text-gray-700 hover:bg-gray-50'
                  }`}
                  title={plan.name !== 'Pro' && import.meta.env.VITE_DEV_BYPASS === 'true' && import.meta.env.DEV ? "Dev mode active – bypassing TikTok login" : ""}
                >
                  {plan.name !== 'Pro' && plan.primary && (
                    <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                      <div className="w-3 h-3 bg-black rounded-sm"></div>
                    </div>
                  )}
                  <span>{plan.buttonText}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gray-50 rounded-xl p-8 space-y-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-space-grotesk">
            Ready to catch more buyers?
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Start free. No credit card required.
          </p>
          
          {authState.isAuthenticated ? (
            <button 
              onClick={handleDashboardClick}
              className="px-8 py-4 bg-[#FF3B5C] text-white rounded-lg hover:bg-[#E63350] transition-colors font-semibold text-lg flex items-center space-x-2 mx-auto group"
            >
              <span>Go to Dashboard</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <div className="space-y-4">
              <button 
                onClick={handleTikTokLogin}
                className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold text-lg flex items-center space-x-3 mx-auto group shadow-lg hover:shadow-xl"
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
                <div className="flex items-center justify-center space-x-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  <Zap size={14} />
                  <span>Dev mode active – bypassing TikTok login</span>
                </div>
              )}
              
              {/* Privacy Message */}
              <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                We'll never message your followers or access private data. TikTok login keeps your account safe.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Pricing;