import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Mail, MessageCircle, Search } from 'lucide-react';

const HelpPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [crispLoaded, setCrispLoaded] = useState(false);

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: '🚀' },
    { id: 'billing', name: 'Billing & Payments', icon: '💳' },
    { id: 'limits', name: 'Comment Limits', icon: '📊' },
    { id: 'privacy', name: 'Privacy & Data', icon: '🔒' },
    { id: 'setup', name: 'Creator Setup', icon: '⚙️' },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: '🔧' }
  ];

  const faqs = {
    'getting-started': [
      {
        question: 'How do I start using GlassConversion?',
        answer: 'Simply sign up for a free account and enter your TikTok handle. No downloads or integrations needed—just go live as usual and we\'ll analyze your comments in real-time.'
      },
      {
        question: 'Do I need to install anything?',
        answer: 'Nope! GlassConversion works entirely in the cloud. Just create an account and start your next TikTok Live stream.'
      },
      {
        question: 'How quickly will I see results?',
        answer: 'You\'ll see buying signals flagged in real-time during your stream, and get a full report within minutes after you end your live session.'
      }
    ],
    'billing': [
      {
        question: 'How does billing work?',
        answer: 'We charge based on comments analyzed per month. Your free plan includes 500 comments, and paid plans start at $19/month for 5,000 comments.'
      },
      {
        question: 'Can I change plans anytime?',
        answer: 'Yes! Upgrade or downgrade your plan anytime. Changes take effect immediately, and we\'ll prorate any billing adjustments.'
      },
      {
        question: 'What happens if I go over my comment limit?',
        answer: 'We\'ll send you a friendly heads-up when you\'re approaching your limit. You can upgrade anytime or wait until next month\'s reset.'
      }
    ],
    'limits': [
      {
        question: 'How are comments counted?',
        answer: 'We count each unique comment during your live streams. Repeated messages from the same user within 30 seconds count as one comment.'
      },
      {
        question: 'Do all comments count toward my limit?',
        answer: 'Only comments during active live streams count. Comments on regular posts or after your stream ends don\'t affect your monthly limit.'
      },
      {
        question: 'Can I see my current usage?',
        answer: 'Yes! Your dashboard shows real-time usage and how many comments you have left for the month.'
      }
    ],
    'privacy': [
      {
        question: 'What data do you collect?',
        answer: 'We only analyze comment text for buying intent. We don\'t store usernames, profile data, or any personal information about your viewers.'
      },
      {
        question: 'How long do you keep my data?',
        answer: 'All comment data is automatically deleted within 48 hours. We only keep anonymized analytics and your account settings.'
      },
      {
        question: 'Is this GDPR compliant?',
        answer: 'Yes! We\'re fully GDPR compliant and don\'t track or store any personal data from your viewers.'
      }
    ],
    'setup': [
      {
        question: 'Do I need to change how I stream?',
        answer: 'Not at all! Stream exactly like you normally do. GlassConversion works silently in the background.'
      },
      {
        question: 'Can I use this with other platforms?',
        answer: 'Currently we only support TikTok Live, but we\'re exploring other platforms based on creator feedback.'
      },
      {
        question: 'What if I have multiple TikTok accounts?',
        answer: 'You can add multiple TikTok handles to your account. All streams count toward your monthly comment limit.'
      }
    ],
    'troubleshooting': [
      {
        question: 'My stream isn\'t being detected',
        answer: 'Make sure your TikTok handle is correctly entered in your dashboard. If issues persist, try refreshing your account connection.'
      },
      {
        question: 'I\'m not seeing any buying signals',
        answer: 'This is normal for streams with low engagement or product-focused content. Our AI gets better at detecting intent as your audience grows.'
      },
      {
        question: 'Where is my post-stream report?',
        answer: 'Reports are generated within 5 minutes after your stream ends. Check your dashboard or email for the latest report.'
      }
    ]
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const loadCrispChat = () => {
    // Prevent loading Crisp multiple times
    if (crispLoaded || (window as any).$crisp) {
      // If already loaded, just open the chat
      if ((window as any).$crisp) {
        (window as any).$crisp.push(["do", "chat:open"]);
      }
      return;
    }

    // Set up Crisp configuration
    (window as any).$crisp = [];
    (window as any).CRISP_WEBSITE_ID = "YOUR_CRISP_ID";

    // Create and inject the Crisp script
    const script = document.createElement("script");
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;
    
    // Once script loads, open the chat automatically
    script.onload = () => {
      setCrispLoaded(true);
      // Small delay to ensure Crisp is fully initialized
      setTimeout(() => {
        if ((window as any).$crisp) {
          (window as any).$crisp.push(["do", "chat:open"]);
        }
      }, 500);
    };

    document.getElementsByTagName("head")[0].appendChild(script);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 font-space-grotesk">
            Need help? We've got you.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find answers to common questions or reach out to our team. We're here to help you make the most of your TikTok Live streams.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF3B5C] focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Sidebar - Categories */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 font-space-grotesk">
                  Browse by topic
                </h3>
                <nav className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeCategory === category.id
                          ? 'bg-[#FF3B5C]/10 text-[#FF3B5C]'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Right Content - FAQs */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-8">
                  <span className="text-2xl">
                    {categories.find(cat => cat.id === activeCategory)?.icon}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 font-space-grotesk">
                    {categories.find(cat => cat.id === activeCategory)?.name}
                  </h2>
                </div>

                {faqs[activeCategory as keyof typeof faqs]?.map((faq, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </h3>
                      {expandedFaq === index ? (
                        <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronRight size={20} className="text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 font-space-grotesk">
            Still stuck?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Can't find what you're looking for? Our team is here to help.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a
              href="mailto:support@glassconversion.com"
              className="flex items-center justify-center space-x-3 p-6 bg-white rounded-xl border border-gray-200 hover:border-[#FF3B5C] transition-colors group"
            >
              <Mail size={24} className="text-[#FF3B5C]" />
              <div className="text-left">
                <div className="font-semibold text-gray-900">Email us</div>
                <div className="text-sm text-gray-600">Usually reply within 4 hours</div>
              </div>
            </a>
            
            <button 
              onClick={loadCrispChat}
              className="flex items-center justify-center space-x-3 p-6 bg-white rounded-xl border border-gray-200 hover:border-[#FF3B5C] transition-colors group"
            >
              <MessageCircle size={24} className="text-[#FF3B5C]" />
              <div className="text-left">
                <div className="font-semibold text-gray-900">Live chat</div>
                <div className="text-sm text-gray-600">Available 9am-6pm EST</div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">
            Can't find your answer? Email us at{' '}
            <a 
              href="mailto:support@glassconversion.com" 
              className="text-[#FF3B5C] hover:underline font-medium"
            >
              support@glassconversion.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HelpPage;