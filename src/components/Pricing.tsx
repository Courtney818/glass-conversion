import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

const Pricing: React.FC = () => {
  const handleSignUpClick = () => {
    window.location.hash = '#signup';
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
      buttonText: 'Start free',
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
      buttonText: 'Get started',
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

              <button 
                onClick={handleSignUpClick}
                className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 group ${
                  plan.primary 
                    ? 'bg-[#FF3B5C] text-white hover:bg-[#E63350]' 
                    : 'border text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{plan.buttonText}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gray-50 rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-space-grotesk">
            Ready to catch more buyers?
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Start free. No credit card required.
          </p>
          <button 
            onClick={handleSignUpClick}
            className="px-8 py-4 bg-[#FF3B5C] text-white rounded-lg hover:bg-[#E63350] transition-colors font-semibold text-lg flex items-center space-x-2 mx-auto group"
          >
            <span>Start free today</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;