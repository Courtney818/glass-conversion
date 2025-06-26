import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHelpClick = () => {
    window.location.hash = '#help';
    window.location.reload();
  };

  const handlePrivacyClick = () => {
    window.location.hash = '#privacy';
    window.location.reload();
  };

  const handleTermsClick = () => {
    window.location.hash = '#terms';
    window.location.reload();
  };

  const handleHomeClick = () => {
    window.location.hash = '';
    window.location.reload();
  };

  const handleLoginClick = () => {
    window.location.hash = '#login';
    window.location.reload();
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b shadow-sm' 
        : 'bg-white/80 backdrop-blur-md'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button onClick={handleHomeClick} className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#FF3B5C] rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="text-xl font-bold text-gray-900 font-space-grotesk">
              GlassConversion
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-gray-900 transition-colors">
              Pricing
            </a>
          </div>

          {/* Desktop CTA Button - Only Login */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={handleLoginClick}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2 group font-semibold"
            >
              <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-sm"></div>
              </div>
              <span>Log in with TikTok</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
                Features
              </a>
              <a href="#pricing" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
                Pricing
              </a>
              <div className="pt-2 space-y-2">
                <button 
                  onClick={handleLoginClick}
                  className="w-full px-3 py-3 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center justify-center space-x-2 font-semibold"
                >
                  <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                    <div className="w-3 h-3 bg-black rounded-sm"></div>
                  </div>
                  <span>Log in with TikTok</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;