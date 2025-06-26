import React, { useState } from 'react';
import { 
  BarChart3, 
  Zap, 
  Play, 
  TrendingUp, 
  Settings, 
  HelpCircle, 
  Menu, 
  X, 
  LogOut,
  Lock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTikTokConnection } from '../hooks/useTikTokConnection';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  requiresConnection?: boolean;
  tooltip?: string;
}

interface DashboardSidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  currentPage,
  onPageChange,
  isCollapsed,
  onToggleCollapse
}) => {
  const { authState, logout } = useAuth();
  const { connectionState } = useTikTokConnection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      tooltip: 'Overview page with intent graph and stream summary'
    },
    {
      id: 'live-tools',
      label: 'Live Tools',
      icon: Zap,
      requiresConnection: true,
      tooltip: connectionState.isConnected 
        ? 'Real-time buyer alerts and prompt generator' 
        : 'Connect TikTok to access live tools'
    },
    {
      id: 'replays',
      label: 'Replays',
      icon: Play,
      tooltip: 'Timestamped buyer signal logs linked to TikTok rewatch'
    },
    {
      id: 'insights',
      label: 'Insights',
      icon: TrendingUp,
      tooltip: 'Stream performance and conversion analytics'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      tooltip: 'TikTok connection and preferences'
    },
    {
      id: 'help',
      label: 'Help',
      icon: HelpCircle,
      tooltip: 'Setup guide, FAQ, and support'
    }
  ];

  const handleNavClick = (item: NavItem) => {
    if (item.requiresConnection && !connectionState.isConnected) {
      // Don't navigate if connection is required but not available
      return;
    }
    onPageChange(item.id);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavItemComponent: React.FC<{ item: NavItem; isMobile?: boolean }> = ({ item, isMobile = false }) => {
    const isActive = currentPage === item.id;
    const isDisabled = item.requiresConnection && !connectionState.isConnected;
    
    return (
      <div className="relative group">
        <button
          onClick={() => handleNavClick(item)}
          disabled={isDisabled}
          className={`
            w-full flex items-center space-x-5 px-6 py-5 rounded-3xl transition-all duration-500 relative group/button backdrop-blur-xl border
            ${isActive 
              ? 'bg-gradient-to-r from-[#FF3B5C]/30 via-[#FF3B5C]/20 to-[#FF6B8A]/30 text-[#FF3B5C] shadow-2xl shadow-[#FF3B5C]/30 border-[#FF3B5C]/40 scale-105' 
              : isDisabled
              ? 'text-gray-400 cursor-not-allowed bg-white/20 border-white/20'
              : 'text-gray-700 hover:bg-white/70 hover:text-gray-900 hover:shadow-2xl hover:shadow-black/10 border-white/30 hover:border-white/60 hover:scale-105'
            }
            ${isMobile ? 'justify-start' : isCollapsed ? 'justify-center' : 'justify-start'}
            focus:outline-none focus:ring-2 focus:ring-[#FF3B5C]/50 focus:ring-offset-2 focus:ring-offset-transparent
            disabled:hover:bg-white/20 disabled:hover:shadow-none disabled:hover:border-white/20 disabled:hover:scale-100
          `}
          aria-label={item.label}
          title={isCollapsed && !isMobile ? item.tooltip : undefined}
        >
          {/* Active indicator */}
          {isActive && (
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-12 bg-gradient-to-b from-[#FF3B5C] to-[#FF6B8A] rounded-r-full shadow-xl shadow-[#FF3B5C]/50" />
          )}
          
          {/* Icon */}
          <div className={`flex-shrink-0 transition-all duration-500 ${
            isActive 
              ? 'text-[#FF3B5C] scale-125 drop-shadow-lg' 
              : isDisabled 
              ? 'text-gray-400' 
              : 'text-gray-600 group-hover/button:text-gray-900 group-hover/button:scale-110'
          }`}>
            <item.icon size={24} />
          </div>
          
          {/* Lock icon for disabled items */}
          {isDisabled && (
            <div className="absolute top-4 right-4">
              <Lock size={16} className="text-gray-400" />
            </div>
          )}
          
          {/* Label */}
          {(!isCollapsed || isMobile) && (
            <span className={`font-bold text-base transition-all duration-500 ${
              isActive 
                ? 'text-[#FF3B5C]' 
                : isDisabled 
                ? 'text-gray-400' 
                : 'text-gray-700 group-hover/button:text-gray-900'
            }`}>
              {item.label}
            </span>
          )}
        </button>
        
        {/* Tooltip for collapsed sidebar */}
        {isCollapsed && !isMobile && (
          <div className="absolute left-full ml-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-50 delay-500">
            <div className="bg-gray-900/95 backdrop-blur-xl text-white text-base px-6 py-4 rounded-2xl shadow-2xl whitespace-nowrap border border-gray-700/50">
              {item.tooltip}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-3 w-4 h-4 bg-gray-900/95 rotate-45 border-l border-b border-gray-700/50" />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-8 left-8 z-50 p-4 bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500 hover:scale-110"
        aria-label="Toggle navigation menu"
      >
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-500"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen bg-white/70 backdrop-blur-2xl border-r border-white/40 shadow-3xl z-40
        transition-all duration-700 ease-in-out
        ${isCollapsed ? 'w-28' : 'w-80'}
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-10 border-b border-white/30">
            {/* Logo */}
            <div className={`flex items-center transition-all duration-500 ${isCollapsed ? 'justify-center' : 'space-x-6'}`}>
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF3B5C] via-[#FF3B5C] to-[#FF6B8A] rounded-3xl flex items-center justify-center flex-shrink-0 shadow-2xl shadow-[#FF3B5C]/40 border border-[#FF3B5C]/30">
                <div className="w-8 h-8 bg-white rounded-2xl shadow-inner" />
              </div>
              {!isCollapsed && (
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-gray-900 font-space-grotesk tracking-tight">
                    GlassConversion
                  </h1>
                  <p className="text-base font-bold text-gray-600">Analytics Dashboard</p>
                </div>
              )}
            </div>

            {/* Collapse Toggle (Desktop) */}
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex absolute -right-5 top-12 w-10 h-10 bg-white/90 backdrop-blur-xl border border-white/60 rounded-full items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-125 z-50"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-8 space-y-4 overflow-y-auto">
            {navItems.map((item) => (
              <NavItemComponent 
                key={item.id} 
                item={item} 
                isMobile={isMobileMenuOpen && window.innerWidth < 1024}
              />
            ))}
          </nav>

          {/* User Info & Logout */}
          <div className="p-8 border-t border-white/30 space-y-8">
            {/* Connection Status */}
            {!isCollapsed && (
              <div className="space-y-4">
                <div className={`flex items-center space-x-4 px-6 py-4 rounded-2xl text-base transition-all duration-500 backdrop-blur-xl border ${
                  connectionState.isConnected 
                    ? 'bg-gradient-to-r from-green-50/80 to-emerald-50/80 text-green-800 border-green-200/60 shadow-xl shadow-green-500/20' 
                    : 'bg-gradient-to-r from-gray-50/80 to-slate-50/80 text-gray-600 border-gray-200/60 shadow-lg'
                }`}>
                  <div className={`w-4 h-4 rounded-full transition-all duration-500 ${
                    connectionState.isConnected ? 'bg-green-500 shadow-xl shadow-green-500/60 animate-pulse' : 'bg-gray-400'
                  }`} />
                  <span className="font-bold text-sm">
                    {connectionState.isConnected 
                      ? `Connected: ${connectionState.tiktokHandle}` 
                      : 'Not Connected to TikTok'
                    }
                  </span>
                </div>
              </div>
            )}

            {/* User Profile */}
            <div className={`flex items-center transition-all duration-500 ${isCollapsed ? 'justify-center' : 'space-x-6'} mb-6`}>
              {authState.user?.avatarUrl && (
                <img 
                  src={authState.user.avatarUrl} 
                  alt={authState.user.displayName}
                  className="w-16 h-16 rounded-3xl border-4 border-white shadow-2xl flex-shrink-0"
                />
              )}
              {!isCollapsed && (
                <div className="flex-1 min-w-0 space-y-2">
                  <p className="text-base font-bold text-gray-900 truncate">
                    {authState.user?.displayName}
                  </p>
                  <p className="text-sm font-bold text-gray-600 truncate">
                    {connectionState.tiktokHandle || 'No handle connected'}
                  </p>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className={`
                w-full flex items-center space-x-5 px-6 py-5 text-gray-700 hover:bg-red-50/80 hover:text-red-700 rounded-3xl transition-all duration-500 border border-white/30 hover:border-red-200/60 hover:shadow-2xl backdrop-blur-xl hover:scale-105
                ${isCollapsed ? 'justify-center' : 'justify-start'}
                focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-transparent
              `}
              aria-label="Logout"
              title={isCollapsed ? 'Logout' : undefined}
            >
              <LogOut size={24} className="transition-transform duration-500 hover:scale-110" />
              {!isCollapsed && <span className="font-bold text-base">Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;