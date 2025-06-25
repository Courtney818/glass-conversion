import React from 'react';
import { Video, Brain, FileText } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: 'Go live as usual',
      description: 'Start your TikTok Live. GlassConversion works silently in the background.',
      icon: Video
    },
    {
      number: 2,
      title: 'We flag buying signals',
      description: 'AI analyzes comments in real-time to identify viewers ready to purchase.',
      icon: Brain
    },
    {
      number: 3,
      title: 'Get your report',
      description: 'Receive insights on engagement peaks and conversion opportunities.',
      icon: FileText
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 font-space-grotesk">
            How it works
          </h2>
          <p className="text-xl text-gray-600">
            Three steps to better TikTok Live conversions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="text-center">
              <div className="w-16 h-16 bg-[#FF3B5C] rounded-full flex items-center justify-center mx-auto mb-6">
                <step.icon size={24} className="text-white" />
              </div>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold text-gray-600">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-space-grotesk">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;