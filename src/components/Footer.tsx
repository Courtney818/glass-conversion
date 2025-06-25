import React from 'react';
import { Mail, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const handlePrivacyClick = () => {
    window.location.hash = '#privacy';
    window.location.reload();
  };

  const handleTermsClick = () => {
    window.location.hash = '#terms';
    window.location.reload();
  };

  const handleHelpClick = () => {
    window.location.hash = '#help';
    window.location.reload();
  };

  return (
    <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#FF3B5C] rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-xl font-bold font-space-grotesk">
                GlassConversion
              </span>
            </div>
            <p className="text-gray-400 max-w-md">
              Privacy-first analytics for TikTok Live creators. Catch buyers before they scroll away.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={handleHelpClick} className="hover:text-white transition-colors">
                  Help
                </button>
              </li>
              <li>
                <button onClick={handlePrivacyClick} className="hover:text-white transition-colors">
                  Privacy
                </button>
              </li>
              <li>
                <button onClick={handleTermsClick} className="hover:text-white transition-colors">
                  Terms
                </button>
              </li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 GlassConversion. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-4 sm:mt-0">
            Built for TikTok creators
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;