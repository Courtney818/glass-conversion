import React from 'react';
import { Eye, BarChart3, Shield, Download } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Eye,
      title: 'Spot buying signals instantly',
      description: 'AI flags high-intent comments as they happen. Never miss a ready-to-buy viewer again.'
    },
    {
      icon: BarChart3,
      title: 'Get post-stream insights',
      description: 'See exactly when viewers showed interest and which products drove engagement.'
    },
    {
      icon: Shield,
      title: 'Privacy-safe by design',
      description: 'No tracking, no data stored. Comments analyzed and deleted within 48 hours.'
    },
    {
      icon: Download,
      title: 'Export for follow-up',
      description: 'Download flagged moments as CSV. Perfect for outreach and future planning.'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 font-space-grotesk">
            Turn comments into customers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to identify and act on buying intent during your TikTok Live streams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#FF3B5C]/10 rounded-lg flex items-center justify-center mb-6">
                <feature.icon size={24} className="text-[#FF3B5C]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-space-grotesk">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;