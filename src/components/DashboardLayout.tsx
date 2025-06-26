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
          <div className="p-6 space-y-8">
            {/* Header Section */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900 font-space-grotesk tracking-tight">
                Dashboard Overview
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                Your TikTok Live analytics at a glance
              </p>
            </div>
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <div className="bg-white/60 backdrop-blur-2xl rounded-2xl p-6 shadow-lg border border-white/40 hover:shadow-xl transition-all duration-500 group">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100/80 to-indigo-100/80 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg border border-blue-200/50">
                    <MessageSquare size={24} className="text-blue-600" />
                  </div>
                  <span className="text-xs font-bold text-gray-500 bg-white/60 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/60">This week</span>
                </div>
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-gray-900 tracking-tight">47</div>
                  <div className="text-sm font-bold text-gray-600">Buying signals detected</div>
                  <div className="flex items-center space-x-2 text-green-600 bg-green-50/60 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <TrendingUp size={12} />
                    <span className="text-xs font-bold">+12% from last week</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/60 backdrop-blur-2xl rounded-2xl p-6 shadow-lg border border-white/40 hover:shadow-xl transition-all duration-500 group">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100/80 to-emerald-100/80 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg border border-green-200/50">
                    <Target size={24} className="text-green-600" />
                  </div>
                  <span className="text-xs font-bold text-gray-500 bg-white/60 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/60">Last stream</span>
                </div>
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-gray-900 tracking-tight">23%</div>
                  <div className="text-sm font-bold text-gray-600">Intent rate</div>
                  <div className="flex items-center space-x-2 text-green-600 bg-green-50/60 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <TrendingUp size={12} />
                    <span className="text-xs font-bold">Above average</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/60 backdrop-blur-2xl rounded-2xl p-6 shadow-lg border border-white/40 hover:shadow-xl transition-all duration-500 group">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100/80 to-violet-100/80 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg border border-purple-200/50">
                    <BarChart3 size={24} className="text-purple-600" />
                  </div>
                  <span className="text-xs font-bold text-gray-500 bg-white/60 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/60">This month</span>
                </div>
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-gray-900 tracking-tight">3</div>
                  <div className="text-sm font-bold text-gray-600">Streams analyzed</div>
                  <div className="flex items-center space-x-2 text-blue-600 bg-blue-50/60 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <Activity size={12} />
                    <span className="text-xs font-bold">2.1 avg hours</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/60 backdrop-blur-2xl rounded-2xl p-6 shadow-lg border border-white/40 hover:shadow-xl transition-all duration-500 group">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF3B5C]/20 to-[#FF6B8A]/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg border border-[#FF3B5C]/30">
                    <Zap size={24} className="text-[#FF3B5C]" />
                  </div>
                  <span className="text-xs font-bold text-gray-500 bg-white/60 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/60">Average</span>
                </div>
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-gray-900 tracking-tight">89%</div>
                  <div className="text-sm font-bold text-gray-600">Prompt usage</div>
                  <div className="flex items-center space-x-2 text-[#FF3B5C] bg-[#FF3B5C]/10 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <TrendingUp size={12} />
                    <span className="text-xs font-bold">Excellent rate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="bg-white/60 backdrop-blur-2xl rounded-2xl p-6 shadow-lg border border-white/40 hover:shadow-xl transition-all duration-500">
              <div className="flex items-center justify-between mb-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900 font-space-grotesk tracking-tight">
                    Recent Activity
                  </h2>
                  <p className="text-base text-gray-600 font-medium">Latest updates from your streams</p>
                </div>
                <button className="text-[#FF3B5C] hover:text-[#E63350] font-bold flex items-center space-x-2 transition-all duration-300 bg-[#FF3B5C]/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-[#FF3B5C]/20 hover:bg-[#FF3B5C]/20 text-base">
                  <span>View All</span>
                  <ArrowRight size={16} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-green-50/60 via-green-50/40 to-emerald-50/60 backdrop-blur-xl rounded-2xl border border-green-200/60 hover:shadow-xl transition-all duration-500">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-green-500/50"></div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-base text-gray-900">Stream completed successfully</p>
                      <span className="text-sm font-bold text-gray-500 bg-white/60 backdrop-blur-sm px-2 py-1 rounded-lg">2 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">47 buying signals detected with 23% intent rate</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center space-x-1 bg-white/60 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <Users size={12} />
                        <span className="font-bold">234 peak viewers</span>
                      </span>
                      <span className="flex items-center space-x-1 bg-white/60 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <Clock size={12} />
                        <span className="font-bold">1h 32m duration</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-blue-50/60 via-blue-50/40 to-indigo-50/60 backdrop-blur-xl rounded-2xl border border-blue-200/60 hover:shadow-xl transition-all duration-500">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-blue-500/50"></div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-base text-gray-900">New keyword trending</p>
                      <span className="text-sm font-bold text-gray-500 bg-white/60 backdrop-blur-sm px-2 py-1 rounded-lg">5 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">"shipping" mentioned 23 times across recent streams</p>
                    <div className="inline-flex items-center space-x-1 bg-blue-100/80 text-blue-800 px-2 py-1 rounded-lg text-xs font-bold backdrop-blur-sm border border-blue-200/60">
                      <TrendingUp size={10} />
                      <span>+45% increase</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-purple-50/60 via-purple-50/40 to-violet-50/60 backdrop-blur-xl rounded-2xl border border-purple-200/60 hover:shadow-xl transition-all duration-500">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-purple-500/50"></div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-base text-gray-900">TikTok handle connected</p>
                      <span className="text-sm font-bold text-gray-500 bg-white/60 backdrop-blur-sm px-2 py-1 rounded-lg">1 day ago</span>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">Successfully connected {connectionState.tiktokHandle}</p>
                    <div className="inline-flex items-center space-x-1 bg-green-100/80 text-green-800 px-2 py-1 rounded-lg text-xs font-bold backdrop-blur-sm border border-green-200/60">
                      <span>✓ Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#FF3B5C]/20 via-[#FF3B5C]/10 to-[#FF6B8A]/20 backdrop-blur-2xl rounded-2xl p-6 shadow-lg border border-[#FF3B5C]/30 hover:shadow-xl transition-all duration-500">
                <div className="w-16 h-16 bg-[#FF3B5C]/30 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 shadow-lg border border-[#FF3B5C]/40">
                  <Zap size={28} className="text-[#FF3B5C]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-space-grotesk mb-3 tracking-tight">
                  Start Live Analysis
                </h3>
                <p className="text-base text-gray-600 mb-6 leading-relaxed font-medium">
                  Begin monitoring your next TikTok Live stream for buyer intent signals in real-time.
                </p>
                <button 
                  onClick={() => setCurrentPage('live-tools')}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#FF3B5C] to-[#FF6B8A] text-white rounded-xl hover:from-[#E63350] hover:to-[#FF3B5C] transition-all duration-500 font-bold text-base flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl backdrop-blur-sm border border-[#FF3B5C]/50 hover:scale-105"
                >
                  <span>Go Live</span>
                  <ArrowRight size={16} />
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50/60 via-blue-50/40 to-indigo-50/60 backdrop-blur-2xl rounded-2xl p-6 shadow-lg border border-blue-200/60 hover:shadow-xl transition-all duration-500">
                <div className="w-16 h-16 bg-blue-100/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 shadow-lg border border-blue-200/50">
                  <BarChart3 size={28} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-space-grotesk mb-3 tracking-tight">
                  View Insights
                </h3>
                <p className="text-base text-gray-600 mb-6 leading-relaxed font-medium">
                  Analyze your stream performance and discover trends in viewer behavior.
                </p>
                <button 
                  onClick={() => setCurrentPage('insights')}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-500 font-bold text-base flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl backdrop-blur-sm border border-blue-500/50 hover:scale-105"
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
          <div className="p-6 space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900 font-space-grotesk tracking-tight">
                Stream Replays
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                Timestamped buyer signals linked to TikTok rewatch
              </p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-2xl rounded-2xl p-10 shadow-lg border border-white/40 text-center hover:shadow-xl transition-all duration-500">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100/80 to-indigo-100/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg border border-purple-200/50">
                <Play size={32} className="text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 font-space-grotesk mb-4 tracking-tight">
                Replays Coming Soon
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
                View timestamped buyer signals and jump directly to those moments in your TikTok replays. 
                Perfect for following up with interested viewers.
              </p>
              <div className="mt-8 inline-flex items-center space-x-2 text-purple-600 font-bold bg-purple-50/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-purple-200/60 text-base">
                <Clock size={16} />
                <span>Expected in next update</span>
              </div>
            </div>
          </div>
        );
      
      case 'insights':
        return (
          <div className="p-6 space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900 font-space-grotesk tracking-tight">
                Performance Insights
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                Stream performance and conversion analytics
              </p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-2xl rounded-2xl p-10 shadow-lg border border-white/40 text-center hover:shadow-xl transition-all duration-500">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100/80 to-emerald-100/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg border border-green-200/50">
                <BarChart3 size={32} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 font-space-grotesk mb-4 tracking-tight">
                Advanced Insights Coming Soon
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
                Deep dive into your stream performance with trend analysis, conversion metrics, 
                and actionable recommendations to boost your sales.
              </p>
              <div className="mt-8 inline-flex items-center space-x-2 text-green-600 font-bold bg-green-50/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-green-200/60 text-base">
                <TrendingUp size={16} />
                <span>Advanced analytics in development</span>
              </div>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="p-6 space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900 font-space-grotesk tracking-tight">
                Settings
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                TikTok connection and preferences
              </p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-2xl rounded-2xl p-10 shadow-lg border border-white/40 text-center hover:shadow-xl transition-all duration-500">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100/80 to-slate-100/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg border border-gray-200/50">
                <span className="text-3xl">⚙️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 font-space-grotesk mb-4 tracking-tight">
                Settings Panel Coming Soon
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
                Manage your TikTok connection, notification preferences, account settings, 
                and customize your dashboard experience.
              </p>
              <div className="mt-8 inline-flex items-center space-x-2 text-gray-600 font-bold bg-gray-50/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-200/60 text-base">
                <span>🔧</span>
                <span>Configuration options in development</span>
              </div>
            </div>
          </div>
        );
      
      case 'help':
        return (
          <div className="p-6 space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900 font-space-grotesk tracking-tight">
                Help & Support
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                Setup guide, FAQ, and support resources
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/60 backdrop-blur-2xl rounded-2xl p-6 shadow-lg border border-white/40 hover:shadow-xl transition-all duration-500 group">
                <div className="w-16 h-16 bg-blue-100/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg border border-blue-200/50">
                  <BookOpen size={28} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-space-grotesk mb-4 tracking-tight">
                  Setup Guide
                </h3>
                <p className="text-base text-gray-600 mb-6 leading-relaxed font-medium">
                  Learn how to connect your TikTok account and start analyzing your live streams effectively.
                </p>
                <button className="text-[#FF3B5C] font-bold hover:text-[#E63350] transition-all duration-300 flex items-center space-x-2 group bg-[#FF3B5C]/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-[#FF3B5C]/20 hover:bg-[#FF3B5C]/20 text-base">
                  <span>Read Guide</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <div className="bg-white/60 backdrop-blur-2xl rounded-2xl p-6 shadow-lg border border-white/40 hover:shadow-xl transition-all duration-500 group">
                <div className="w-16 h-16 bg-green-100/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg border border-green-200/50">
                  <HelpCircle size={28} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-space-grotesk mb-4 tracking-tight">
                  FAQ
                </h3>
                <p className="text-base text-gray-600 mb-6 leading-relaxed font-medium">
                  Find answers to common questions about GlassConversion features and functionality.
                </p>
                <button className="text-[#FF3B5C] font-bold hover:text-[#E63350] transition-all duration-300 flex items-center space-x-2 group bg-[#FF3B5C]/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-[#FF3B5C]/20 hover:bg-[#FF3B5C]/20 text-base">
                  <span>View FAQ</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <div className="bg-white/60 backdrop-blur-2xl rounded-2xl p-6 shadow-lg border border-white/40 hover:shadow-xl transition-all duration-500 group">
                <div className="w-16 h-16 bg-purple-100/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg border border-purple-200/50">
                  <MessageCircle size={28} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-space-grotesk mb-4 tracking-tight">
                  Contact Support
                </h3>
                <p className="text-base text-gray-600 mb-6 leading-relaxed font-medium">
                  Get help from our team via email or live chat. We're here to help you succeed.
                </p>
                <button className="text-[#FF3B5C] font-bold hover:text-[#E63350] transition-all duration-300 flex items-center space-x-2 group bg-[#FF3B5C]/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-[#FF3B5C]/20 hover:bg-[#FF3B5C]/20 text-base">
                  <span>Contact Us</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <div className="bg-white/60 backdrop-blur-2xl rounded-2xl p-6 shadow-lg border border-white/40 hover:shadow-xl transition-all duration-500 group">
                <div className="w-16 h-16 bg-yellow-100/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg border border-yellow-200/50">
                  <Play size={28} className="text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-space-grotesk mb-4 tracking-tight">
                  Video Tutorials
                </h3>
                <p className="text-base text-gray-600 mb-6 leading-relaxed font-medium">
                  Watch step-by-step tutorials on using GlassConversion effectively for maximum results.
                </p>
                <button className="text-[#FF3B5C] font-bold hover:text-[#E63350] transition-all duration-300 flex items-center space-x-2 group bg-[#FF3B5C]/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-[#FF3B5C]/20 hover:bg-[#FF3B5C]/20 text-base">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30 flex">
      <DashboardSidebar
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
      />
      
      <main className={`flex-1 transition-all duration-500 overflow-auto ${
        isSidebarCollapsed ? 'lg:ml-6' : 'lg:ml-6'
      }`}>
        <div className="min-h-full">
          {renderPageContent()}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;