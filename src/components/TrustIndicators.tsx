import React from 'react';
import { Shield, Lock, CheckCircle } from 'lucide-react';

const TrustIndicators: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 font-space-grotesk">
            Privacy-first by design
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your viewers' privacy matters. We analyze comments without storing personal data or tracking users.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Shield size={24} className="text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 font-space-grotesk">No tracking</h3>
            <p className="text-gray-600">We don't track users or store personal information</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Lock size={24} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 font-space-grotesk">Data deleted</h3>
            <p className="text-gray-600">All comment data is automatically deleted within 48 hours</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={24} className="text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 font-space-grotesk">GDPR compliant</h3>
            <p className="text-gray-600">Fully compliant with privacy regulations worldwide</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center bg-white rounded-xl p-8 shadow-sm">
          <div className="w-16 h-16 bg-[#FF3B5C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={24} className="text-[#FF3B5C]" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3 font-space-grotesk">
            Built for TikTok creators
          </h3>
          <p className="text-gray-600">
            Designed specifically for TikTok Live commerce with platform compliance and creator needs in mind.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;