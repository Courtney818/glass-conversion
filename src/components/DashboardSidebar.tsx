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
            w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 relative
            ${isActive 
              ? 'bg-[#FF3B5C]/10 text-[#FF3B5C] shadow-lg shadow-[#FF3B5C]/20' 
              : isDisabled
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-white/60 hover:text-gray-900 hover:shadow-md'
            }
            ${isMobile ? 'justify-start' : isCollapsed ? 'justify-center' : 'justify-start'}
            focus:outline-none focus:ring-2 focus:ring-[#FF3B5C]/50 focus:ring-offset-2
            disabled:hover:bg-transparent disabled:hover:shadow-none
          `}
          aria-label={item.label}
          title={isCollapsed && !isMobile ? item.tooltip : undefined}
        >
          {/* Active indicator */}
          {isActive && (
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-[#FF3B5C] rounded-r-full" />
          )}
          
          {/* Icon */}
          <div className={`flex-shrink-0 ${isActive ? 'text-[#FF3B5C]' : ''}`}>
            <item.icon size={20} />
          </div>
          
          {/* Lock icon for disabled items */}
          {isDisabled && (
            <div className="absolute top-2 right-2">
              <Lock size={12} className="text-gray-400" />
            </div>
          )}
          
          {/* Label */}
          {(!isCollapsed || isMobile) && (
            <span className={`font-medium ${isActive ? 'text-[#FF3B5C]' : ''}`}>
              {item.label}
            </span>
          )}
        </button>
        
        {/* Tooltip for collapsed sidebar */}
        {isCollapsed && !isMobile && (
          <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
            <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
              {item.tooltip}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45" />
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
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white/80 backdrop-blur-md rounded-lg shadow-lg border border-white/20"
        aria-label="Toggle navigation menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen bg-white/80 backdrop-blur-md border-r border-white/20 shadow-xl z-40
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-64'}
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/20">
            {/* Logo */}
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <div className="w-10 h-10 bg-[#FF3B5C] rounded-xl flex items-center justify-center flex-shrink-0">
                <div className="w-5 h-5 bg-white rounded-sm" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-xl font-bold text-gray-900 font-space-grotesk">
                    GlassConversion
                  </h1>
                  <p className="text-sm text-gray-600">Analytics Dashboard</p>
                </div>
              )}
            </div>

            {/* Collapse Toggle (Desktop) */}
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex absolute -right-3 top-8 w-6 h-6 bg-white border border-gray-200 rounded-full items-center justify-center shadow-md hover:shadow-lg transition-shadow"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <NavItemComponent 
                key={item.id} 
                item={item} 
                isMobile={isMobileMenuOpen && window.innerWidth < 1024}
              />
            ))}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-white/20">
            {/* Connection Status */}
            {!isCollapsed && (
              <div className="mb-4">
                <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
                  connectionState.isConnected 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-gray-50 text-gray-600 border border-gray-200'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    connectionState.isConnected ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                  <span className="font-medium">
                    {connectionState.isConnected 
                      ? `Connected: ${connectionState.tiktokHandle}` 
                      : 'Not Connected'
                    }
                  </span>
                </div>
              </div>
            )}

            {/* User Profile */}
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} mb-4`}>
              {authState.user?.avatarUrl && (
                <img 
                  src={authState.user.avatarUrl} 
                  alt={authState.user.displayName}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-md flex-shrink-0"
                />
              )}
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {authState.user?.displayName}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {connectionState.tiktokHandle || 'No handle connected'}
                  </p>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-xl transition-colors
                ${isCollapsed ? 'justify-center' : 'justify-start'}
                focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2
              `}
              aria-label="Logout"
              title={isCollapsed ? 'Logout' : undefined}
            >
              <LogOut size={20} />
              {!isCollapsed && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;