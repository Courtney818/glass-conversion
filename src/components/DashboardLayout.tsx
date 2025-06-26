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
          <div className="p-8 space-y-8">
            {/* Header Section */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 font-space-grotesk">
                Dashboard Overview
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Your TikTok Live analytics at a glance
              </p>
            </div>
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare size={24} className="text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">This week</span>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-gray-900">47</div>
                  <div className="text-sm font-medium text-gray-600">Buying signals detected</div>
                  <div className="flex items-center space-x-2 text-green-600">
                    <TrendingUp size={14} />
                    <span className="text-xs font-medium">+12% from last week</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Target size={24} className="text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Last stream</span>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-gray-900">23%</div>
                  <div className="text-sm font-medium text-gray-600">Intent rate</div>
                  <div className="flex items-center space-x-2 text-green-600">
                    <TrendingUp size={14} />
                    <span className="text-xs font-medium">Above average</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 size={24} className="text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">This month</span>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-gray-900">3</div>
                  <div className="text-sm font-medium text-gray-600">Streams analyzed</div>
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Activity size={14} />
                    <span className="text-xs font-medium">2.1 avg hours</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-[#FF3B5C]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Zap size={24} className="text-[#FF3B5C]" />
                  </div>
                  <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Average</span>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-gray-900">89%</div>
                  <div className="text-sm font-medium text-gray-600">Prompt usage</div>
                  <div className="flex items-center space-x-2 text-[#FF3B5C]">
                    <TrendingUp size={14} />
                    <span className="text-xs font-medium">Excellent rate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 font-space-grotesk">
                    Recent Activity
                  </h2>
                  <p className="text-gray-600 mt-2">Latest updates from your streams</p>
                </div>
                <button className="text-[#FF3B5C] hover:text-[#E63350] font-medium flex items-center space-x-2 transition-colors">
                  <span>View All</span>
                  <ArrowRight size={16} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-md transition-all duration-200">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900">Stream completed successfully</p>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-600">47 buying signals detected with 23% intent rate</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Users size={12} />
                        <span>234 peak viewers</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock size={12} />
                        <span>1h 32m duration</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-200">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900">New keyword trending</p>
                      <span className="text-sm text-gray-500">5 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-600">"shipping" mentioned 23 times across recent streams</p>
                    <div className="inline-flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      <TrendingUp size={10} />
                      <span>+45% increase</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-100 hover:shadow-md transition-all duration-200">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900">TikTok handle connected</p>
                      <span className="text-sm text-gray-500">1 day ago</span>
                    </div>
                    <p className="text-sm text-gray-600">Successfully connected {connectionState.tiktokHandle}</p>
                    <div className="inline-flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      <span>✓ Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#FF3B5C]/10 to-[#FF6B8A]/10 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-[#FF3B5C]/20">
                <div className="w-16 h-16 bg-[#FF3B5C]/20 rounded-2xl flex items-center justify-center mb-6">
                  <Zap size={28} className="text-[#FF3B5C]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-space-grotesk mb-3">
                  Start Live Analysis
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Begin monitoring your next TikTok Live stream for buyer intent signals in real-time.
                </p>
                <button 
                  onClick={() => setCurrentPage('live-tools')}
                  className="w-full px-6 py-3 bg-[#FF3B5C] text-white rounded-xl hover:bg-[#E63350] transition-colors font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <span>Go Live</span>
                  <ArrowRight size={18} />
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-blue-200">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <BarChart3 size={28} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-space-grotesk mb-3">
                  View Insights
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Analyze your stream performance and discover trends in viewer behavior.
                </p>
                <button 
                  onClick={() => setCurrentPage('insights')}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <span>View Analytics</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'live-tools':
        return <LiveAnalyticsDashboard />;
      
      case 'replays':
        return (
          <div className="p-8 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 font-space-grotesk">
                Stream Replays
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Timestamped buyer signals linked to TikTok rewatch
              </p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-12 shadow-lg border border-white/20 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Play size={32} className="text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 font-space-grotesk mb-4">
                Replays Coming Soon
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                View timestamped buyer signals and jump directly to those moments in your TikTok replays. 
                Perfect for following up with interested viewers.
              </p>
              <div className="mt-8 inline-flex items-center space-x-2 text-purple-600 font-medium">
                <Clock size={16} />
                <span>Expected in next update</span>
              </div>
            </div>
          </div>
        );
      
      case 'insights':
        return (
          <div className="p-8 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 font-space-grotesk">
                Performance Insights
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Stream performance and conversion analytics
              </p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-12 shadow-lg border border-white/20 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <BarChart3 size={32} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 font-space-grotesk mb-4">
                Advanced Insights Coming Soon
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Deep dive into your stream performance with trend analysis, conversion metrics, 
                and actionable recommendations to boost your sales.
              </p>
              <div className="mt-8 inline-flex items-center space-x-2 text-green-600 font-medium">
                <TrendingUp size={16} />
                <span>Advanced analytics in development</span>
              </div>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="p-8 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 font-space-grotesk">
                Settings
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                TikTok connection and preferences
              </p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-12 shadow-lg border border-white/20 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <span className="text-3xl">⚙️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 font-space-grotesk mb-4">
                Settings Panel Coming Soon
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Manage your TikTok connection, notification preferences, account settings, 
                and customize your dashboard experience.
              </p>
              <div className="mt-8 inline-flex items-center space-x-2 text-gray-600 font-medium">
                <span>🔧</span>
                <span>Configuration options in development</span>
              </div>
            </div>
          </div>
        );
      
      case 'help':
        return (
          <div className="p-8 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 font-space-grotesk">
                Help & Support
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Setup guide, FAQ, and support resources
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen size={28} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-space-grotesk mb-4">
                  Setup Guide
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Learn how to connect your TikTok account and start analyzing your live streams effectively.
                </p>
                <button className="text-[#FF3B5C] font-semibold hover:text-[#E63350] transition-colors flex items-center space-x-2 group">
                  <span>Read Guide</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <HelpCircle size={28} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-space-grotesk mb-4">
                  FAQ
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Find answers to common questions about GlassConversion features and functionality.
                </p>
                <button className="text-[#FF3B5C] font-semibold hover:text-[#E63350] transition-colors flex items-center space-x-2 group">
                  <span>View FAQ</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle size={28} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-space-grotesk mb-4">
                  Contact Support
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Get help from our team via email or live chat. We're here to help you succeed.
                </p>
                <button className="text-[#FF3B5C] font-semibold hover:text-[#E63350] transition-colors flex items-center space-x-2 group">
                  <span>Contact Us</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Play size={28} className="text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-space-grotesk mb-4">
                  Video Tutorials
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Watch step-by-step tutorials on using GlassConversion effectively for maximum results.
                </p>
                <button className="text-[#FF3B5C] font-semibold hover:text-[#E63350] transition-colors flex items-center space-x-2 group">
                  <span>Watch Videos</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 flex">
      <DashboardSidebar
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
      />
      
      <main className={`flex-1 transition-all duration-300 overflow-auto ${
        isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      }`}>
        <div className="min-h-full">
          {renderPageContent()}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;