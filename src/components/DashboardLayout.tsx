import React, { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import LiveAnalyticsDashboard from './LiveAnalyticsDashboard';
import { useAuth } from '../hooks/useAuth';
import { useTikTokConnection } from '../hooks/useTikTokConnection';
import Dashboard from './Dashboard';
import { 
  TrendingUp, 
  MessageSquare, 
  Target, 
  Zap,
  BarChart3,
  Users,
  Clock,
  Activity,
  BookOpen,
  HelpCircle,
  MessageCircle,
  Play,
  ArrowRight
} from 'lucide-react';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { authState } = useAuth();
  const { connectionState } = useTikTokConnection();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // If user is not connected to TikTok, show the connection setup screen
  if (!connectionState.isConnected) {
    return <Dashboard />;
  }

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const handleToggleCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="p-6 space-y-6">
            {/* Header Section */}
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-gray-900 font-space-grotesk">
                Dashboard Overview
              </h1>
              <p className="text-gray-600">
                Your TikTok Live analytics at a glance
              </p>
            </div>
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageSquare size={20} className="text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">This week</span>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-semibold text-gray-900">47</div>
                  <div className="text-sm text-gray-600">Buying signals detected</div>
                  <div className="flex items-center space-x-1 text-green-600">
                    <TrendingUp size={12} />
                    <span className="text-xs font-medium">+12% from last week</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Target size={20} className="text-green-600" />
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">Last stream</span>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-semibold text-gray-900">23%</div>
                  <div className="text-sm text-gray-600">Intent rate</div>
                  <div className="flex items-center space-x-1 text-green-600">
                    <TrendingUp size={12} />
                    <span className="text-xs font-medium">Above average</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 size={20} className="text-purple-600" />
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">This month</span>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-semibold text-gray-900">3</div>
                  <div className="text-sm text-gray-600">Streams analyzed</div>
                  <div className="flex items-center space-x-1 text-blue-600">
                    <Activity size={12} />
                    <span className="text-xs font-medium">2.1 avg hours</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Zap size={20} className="text-red-600" />
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">Average</span>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-semibold text-gray-900">89%</div>
                  <div className="text-sm text-gray-600">Prompt usage</div>
                  <div className="flex items-center space-x-1 text-red-600">
                    <TrendingUp size={12} />
                    <span className="text-xs font-medium">Excellent rate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold text-gray-900 font-space-grotesk">
                    Recent Activity
                  </h2>
                  <p className="text-sm text-gray-600">Latest updates from your streams</p>
                </div>
                <button className="text-[#FF3B5C] hover:text-[#E63350] font-medium flex items-center space-x-1 text-sm">
                  <span>View All</span>
                  <ArrowRight size={14} />
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">Stream completed successfully</p>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-600">47 buying signals detected with 23% intent rate</p>
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Users size={10} />
                        <span>234 peak viewers</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock size={10} />
                        <span>1h 32m duration</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">New keyword trending</p>
                      <span className="text-xs text-gray-500">5 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-600">"shipping" mentioned 23 times across recent streams</p>
                    <div className="inline-flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                      <TrendingUp size={10} />
                      <span>+45% increase</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">TikTok handle connected</p>
                      <span className="text-xs text-gray-500">1 day ago</span>
                    </div>
                    <p className="text-sm text-gray-600">Successfully connected {connectionState.tiktokHandle}</p>
                    <div className="inline-flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      <span>✓ Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap size={24} className="text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 font-space-grotesk mb-2">
                  Start Live Analysis
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Begin monitoring your next TikTok Live stream for buyer intent signals in real-time.
                </p>
                <button 
                  onClick={() => setCurrentPage('live-tools')}
                  className="w-full px-4 py-2 bg-[#FF3B5C] text-white rounded-lg hover:bg-[#E63350] transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <span>Go Live</span>
                  <ArrowRight size={16} />
                </button>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 size={24} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 font-space-grotesk mb-2">
                  View Insights
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Analyze your stream performance and discover trends in viewer behavior.
                </p>
                <button 
                  onClick={() => setCurrentPage('insights')}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <span>View Analytics</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'live-tools':
        return <LiveAnalyticsDashboard />;
      
      case 'replays':
        return (
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-gray-900 font-space-grotesk">
                Stream Replays
              </h1>
              <p className="text-gray-600">
                Timestamped buyer signals linked to TikTok rewatch
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Play size={28} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 font-space-grotesk mb-3">
                Replays Coming Soon
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                View timestamped buyer signals and jump directly to those moments in your TikTok replays. 
                Perfect for following up with interested viewers.
              </p>
              <div className="inline-flex items-center space-x-2 text-purple-600 font-medium bg-purple-50 px-3 py-2 rounded-lg">
                <Clock size={16} />
                <span>Expected in next update</span>
              </div>
            </div>
          </div>
        );
      
      case 'insights':
        return (
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-gray-900 font-space-grotesk">
                Performance Insights
              </h1>
              <p className="text-gray-600">
                Stream performance and conversion analytics
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <BarChart3 size={28} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 font-space-grotesk mb-3">
                Advanced Insights Coming Soon
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                Deep dive into your stream performance with trend analysis, conversion metrics, 
                and actionable recommendations to boost your sales.
              </p>
              <div className="inline-flex items-center space-x-2 text-green-600 font-medium bg-green-50 px-3 py-2 rounded-lg">
                <TrendingUp size={16} />
                <span>Advanced analytics in development</span>
              </div>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-gray-900 font-space-grotesk">
                Settings
              </h1>
              <p className="text-gray-600">
                TikTok connection and preferences
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 font-space-grotesk mb-3">
                Settings Panel Coming Soon
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                Manage your TikTok connection, notification preferences, account settings, 
                and customize your dashboard experience.
              </p>
              <div className="inline-flex items-center space-x-2 text-gray-600 font-medium bg-gray-50 px-3 py-2 rounded-lg">
                <span>🔧</span>
                <span>Configuration options in development</span>
              </div>
            </div>
          </div>
        );
      
      case 'help':
        return (
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-gray-900 font-space-grotesk">
                Help & Support
              </h1>
              <p className="text-gray-600">
                Setup guide, FAQ, and support resources
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen size={24} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 font-space-grotesk mb-3">
                  Setup Guide
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Learn how to connect your TikTok account and start analyzing your live streams effectively.
                </p>
                <button className="text-[#FF3B5C] font-medium hover:text-[#E63350] transition-colors flex items-center space-x-1">
                  <span>Read Guide</span>
                  <ArrowRight size={14} />
                </button>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <HelpCircle size={24} className="text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 font-space-grotesk mb-3">
                  FAQ
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Find answers to common questions about GlassConversion features and functionality.
                </p>
                <button className="text-[#FF3B5C] font-medium hover:text-[#E63350] transition-colors flex items-center space-x-1">
                  <span>View FAQ</span>
                  <ArrowRight size={14} />
                </button>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle size={24} className="text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 font-space-grotesk mb-3">
                  Contact Support
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get help from our team via email or live chat. We're here to help you succeed.
                </p>
                <button className="text-[#FF3B5C] font-medium hover:text-[#E63350] transition-colors flex items-center space-x-1">
                  <span>Contact Us</span>
                  <ArrowRight size={14} />
                </button>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Play size={24} className="text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 font-space-grotesk mb-3">
                  Video Tutorials
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Watch step-by-step tutorials on using GlassConversion effectively for maximum results.
                </p>
                <button className="text-[#FF3B5C] font-medium hover:text-[#E63350] transition-colors flex items-center space-x-1">
                  <span>Watch Videos</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return children;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
      />
      
      <main className={`flex-1 transition-all duration-300 overflow-auto ${
        isSidebarCollapsed ? 'lg:ml-2' : 'lg:ml-2'
      }`}>
        <div className="min-h-full">
          {renderPageContent()}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;