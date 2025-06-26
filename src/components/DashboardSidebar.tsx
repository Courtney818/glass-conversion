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
            w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors relative
            ${isActive 
              ? 'bg-[#FF3B5C]/10 text-[#FF3B5C] border-l-2 border-[#FF3B5C]' 
              : isDisabled
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }
            ${isMobile ? 'justify-start' : isCollapsed ? 'justify-center' : 'justify-start'}
            focus:outline-none focus:ring-2 focus:ring-[#FF3B5C]/50 focus:ring-offset-2
            disabled:hover:bg-transparent disabled:hover:text-gray-400
          `}
          aria-label={item.label}
          title={isCollapsed && !isMobile ? item.tooltip : undefined}
        >
          {/* Icon */}
          <div className={`flex-shrink-0 ${
            isActive 
              ? 'text-[#FF3B5C]' 
              : isDisabled 
              ? 'text-gray-400' 
              : 'text-gray-600'
          }`}>
            <item.icon size={18} />
          </div>
          
          {/* Lock icon for disabled items */}
          {isDisabled && (
            <div className="absolute top-1 right-1">
              <Lock size={10} className="text-gray-400" />
            </div>
          )}
          
          {/* Label */}
          {(!isCollapsed || isMobile) && (
            <span className={`font-medium text-sm ${
              isActive 
                ? 'text-[#FF3B5C]' 
                : isDisabled 
                ? 'text-gray-400' 
                : 'text-gray-700'
            }`}>
              {item.label}
            </span>
          )}
        </button>
        
        {/* Tooltip for collapsed sidebar */}
        {isCollapsed && !isMobile && (
          <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 delay-300">
            <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
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
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
        aria-label="Toggle navigation menu"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-sm z-40
        transition-all duration-300
        ${isCollapsed ? 'w-16' : 'w-64'}
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            {/* Logo */}
            <div className={`flex items-center transition-all duration-300 ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <div className="w-8 h-8 bg-[#FF3B5C] rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="w-4 h-4 bg-white rounded-sm" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-lg font-semibold text-gray-900 font-space-grotesk">
                    GlassConversion
                  </h1>
                  <p className="text-xs text-gray-600">Analytics Dashboard</p>
                </div>
              )}
            </div>

            {/* Collapse Toggle (Desktop) */}
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex absolute -right-3 top-6 w-6 h-6 bg-white border border-gray-200 rounded-full items-center justify-center shadow-sm hover:shadow-md transition-shadow z-50"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavItemComponent 
                key={item.id} 
                item={item} 
                isMobile={isMobileMenuOpen && window.innerWidth < 1024}
              />
            ))}
          </nav>

          {/* User Info & Logout */}
          <div className="p-3 border-t border-gray-200 space-y-3">
            {/* Connection Status */}
            {!isCollapsed && (
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs ${
                connectionState.isConnected 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-gray-50 text-gray-600 border border-gray-200'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  connectionState.isConnected ? 'bg-green-500' : 'bg-gray-400'
                }`} />
                <span className="font-medium truncate">
                  {connectionState.isConnected 
                    ? `Connected: ${connectionState.tiktokHandle}` 
                    : 'Not Connected'
                  }
                </span>
              </div>
            )}

            {/* User Profile */}
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} mb-3`}>
              {authState.user?.avatarUrl && (
                <img 
                  src={authState.user.avatarUrl} 
                  alt={authState.user.displayName}
                  className="w-8 h-8 rounded-lg border border-gray-200 flex-shrink-0"
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
                w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors border border-gray-200 hover:border-red-200
                ${isCollapsed ? 'justify-center' : 'justify-start'}
                focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2
              `}
              aria-label="Logout"
              title={isCollapsed ? 'Logout' : undefined}
            >
              <LogOut size={16} />
              {!isCollapsed && <span className="font-medium text-sm">Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;