import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Navigation: React.FC = () => {
  const { authState, logout } = useAuth();
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

  const handleDashboardClick = () => {
    window.location.hash = '#dashboard';
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

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {authState.isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3">
                  {authState.user?.avatarUrl && (
                    <img 
                      src={authState.user.avatarUrl} 
                      alt={authState.user.displayName}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span className="text-sm text-gray-700">
                    {authState.user?.displayName}
                  </span>
                  {authState.user?.isDev && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      🧪 Dev
                    </span>
                  )}
                </div>
                <button 
                  onClick={handleDashboardClick}
                  className="px-4 py-2 bg-[#FF3B5C] text-white rounded-lg hover:bg-[#E63350] transition-colors flex items-center space-x-2 group"
                >
                  <span>Dashboard</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={handleLoginClick}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Login
                </button>
                <button 
                  onClick={handleLoginClick}
                  className="px-4 py-2 bg-[#FF3B5C] text-white rounded-lg hover:bg-[#E63350] transition-colors flex items-center space-x-2 group"
                >
                  <span>Start free</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </>
            )}
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
                {authState.isAuthenticated ? (
                  <>
                    <div className="px-3 py-2 text-sm text-gray-600">
                      Welcome, {authState.user?.displayName}
                      {authState.user?.isDev && (
                        <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                          🧪 Dev
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={handleDashboardClick}
                      className="w-full px-3 py-2 bg-[#FF3B5C] text-white rounded-lg hover:bg-[#E63350] flex items-center justify-center space-x-2"
                    >
                      <span>Dashboard</span>
                      <ArrowRight size={16} />
                    </button>
                    <button 
                      onClick={logout}
                      className="w-full px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={handleLoginClick}
                      className="w-full px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                    >
                      Login
                    </button>
                    <button 
                      onClick={handleLoginClick}
                      className="w-full px-3 py-2 bg-[#FF3B5C] text-white rounded-lg hover:bg-[#E63350] flex items-center justify-center space-x-2"
                    >
                      <span>Start free</span>
                      <ArrowRight size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;