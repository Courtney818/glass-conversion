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
          <div className="p-10 space-y-10">
            {/* Header Section */}
            <div className="space-y-6">
              <h1 className="text-5xl font-bold text-gray-900 font-space-grotesk tracking-tight">
                Dashboard Overview
              </h1>
              <p className="text-2xl text-gray-600 leading-relaxed font-medium">
                Your TikTok Live analytics at a glance
              </p>
            </div>
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500 group">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100/80 to-indigo-100/80 backdrop-blur-sm rounded-3xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-xl border border-blue-200/50">
                    <MessageSquare size={28} className="text-blue-600" />
                  </div>
                  <span className="text-sm font-bold text-gray-500 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/60">This week</span>
                </div>
                <div className="space-y-4">
                  <div className="text-4xl font-bold text-gray-900 tracking-tight">47</div>
                  <div className="text-base font-bold text-gray-600">Buying signals detected</div>
                  <div className="flex items-center space-x-3 text-green-600 bg-green-50/60 backdrop-blur-sm px-3 py-2 rounded-xl">
                    <TrendingUp size={16} />
                    <span className="text-sm font-bold">+12% from last week</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500 group">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100/80 to-emerald-100/80 backdrop-blur-sm rounded-3xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-xl border border-green-200/50">
                    <Target size={28} className="text-green-600" />
                  </div>
                  <span className="text-sm font-bold text-gray-500 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/60">Last stream</span>
                </div>
                <div className="space-y-4">
                  <div className="text-4xl font-bold text-gray-900 tracking-tight">23%</div>
                  <div className="text-base font-bold text-gray-600">Intent rate</div>
                  <div className="flex items-center space-x-3 text-green-600 bg-green-50/60 backdrop-blur-sm px-3 py-2 rounded-xl">
                    <TrendingUp size={16} />
                    <span className="text-sm font-bold">Above average</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500 group">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100/80 to-violet-100/80 backdrop-blur-sm rounded-3xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-xl border border-purple-200/50">
                    <BarChart3 size={28} className="text-purple-600" />
                  </div>
                  <span className="text-sm font-bold text-gray-500 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/60">This month</span>
                </div>
                <div className="space-y-4">
                  <div className="text-4xl font-bold text-gray-900 tracking-tight">3</div>
                  <div className="text-base font-bold text-gray-600">Streams analyzed</div>
                  <div className="flex items-center space-x-3 text-blue-600 bg-blue-50/60 backdrop-blur-sm px-3 py-2 rounded-xl">
                    <Activity size={16} />
                    <span className="text-sm font-bold">2.1 avg hours</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500 group">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FF3B5C]/20 to-[#FF6B8A]/20 backdrop-blur-sm rounded-3xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-xl border border-[#FF3B5C]/30">
                    <Zap size={28} className="text-[#FF3B5C]" />
                  </div>
                  <span className="text-sm font-bold text-gray-500 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/60">Average</span>
                </div>
                <div className="space-y-4">
                  <div className="text-4xl font-bold text-gray-900 tracking-tight">89%</div>
                  <div className="text-base font-bold text-gray-600">Prompt usage</div>
                  <div className="flex items-center space-x-3 text-[#FF3B5C] bg-[#FF3B5C]/10 backdrop-blur-sm px-3 py-2 rounded-xl">
                    <TrendingUp size={16} />
                    <span className="text-sm font-bold">Excellent rate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500">
              <div className="flex items-center justify-between mb-10">
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold text-gray-900 font-space-grotesk tracking-tight">
                    Recent Activity
                  </h2>
                  <p className="text-lg text-gray-600 font-medium">Latest updates from your streams</p>
                </div>
                <button className="text-[#FF3B5C] hover:text-[#E63350] font-bold flex items-center space-x-3 transition-all duration-300 bg-[#FF3B5C]/10 backdrop-blur-sm px-6 py-3 rounded-2xl border border-[#FF3B5C]/20 hover:bg-[#FF3B5C]/20">
                  <span className="text-lg">View All</span>
                  <ArrowRight size={20} />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-6 p-8 bg-gradient-to-r from-green-50/60 via-green-50/40 to-emerald-50/60 backdrop-blur-xl rounded-3xl border border-green-200/60 hover:shadow-2xl transition-all duration-500">
                  <div className="w-4 h-4 bg-green-500 rounded-full mt-3 flex-shrink-0 shadow-lg shadow-green-500/50"></div>
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-xl text-gray-900">Stream completed successfully</p>
                      <span className="text-base font-bold text-gray-500 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl">2 hours ago</span>
                    </div>
                    <p className="text-lg text-gray-600 font-medium">47 buying signals detected with 23% intent rate</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-xl">
                        <Users size={14} />
                        <span className="font-bold">234 peak viewers</span>
                      </span>
                      <span className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-xl">
                        <Clock size={14} />
                        <span className="font-bold">1h 32m duration</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6 p-8 bg-gradient-to-r from-blue-50/60 via-blue-50/40 to-indigo-50/60 backdrop-blur-xl rounded-3xl border border-blue-200/60 hover:shadow-2xl transition-all duration-500">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mt-3 flex-shrink-0 shadow-lg shadow-blue-500/50"></div>
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-xl text-gray-900">New keyword trending</p>
                      <span className="text-base font-bold text-gray-500 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl">5 hours ago</span>
                    </div>
                    <p className="text-lg text-gray-600 font-medium">"shipping" mentioned 23 times across recent streams</p>
                    <div className="inline-flex items-center space-x-2 bg-blue-100/80 text-blue-800 px-4 py-2 rounded-2xl text-sm font-bold backdrop-blur-sm border border-blue-200/60">
                      <TrendingUp size={12} />
                      <span>+45% increase</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6 p-8 bg-gradient-to-r from-purple-50/60 via-purple-50/40 to-violet-50/60 backdrop-blur-xl rounded-3xl border border-purple-200/60 hover:shadow-2xl transition-all duration-500">
                  <div className="w-4 h-4 bg-purple-500 rounded-full mt-3 flex-shrink-0 shadow-lg shadow-purple-500/50"></div>
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-xl text-gray-900">TikTok handle connected</p>
                      <span className="text-base font-bold text-gray-500 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl">1 day ago</span>
                    </div>
                    <p className="text-lg text-gray-600 font-medium">Successfully connected {connectionState.tiktokHandle}</p>
                    <div className="inline-flex items-center space-x-2 bg-green-100/80 text-green-800 px-4 py-2 rounded-2xl text-sm font-bold backdrop-blur-sm border border-green-200/60">
                      <span>✓ Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-[#FF3B5C]/20 via-[#FF3B5C]/10 to-[#FF6B8A]/20 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-[#FF3B5C]/30 hover:shadow-3xl transition-all duration-500">
                <div className="w-20 h-20 bg-[#FF3B5C]/30 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 shadow-xl border border-[#FF3B5C]/40">
                  <Zap size={32} className="text-[#FF3B5C]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-space-grotesk mb-4 tracking-tight">
                  Start Live Analysis
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium">
                  Begin monitoring your next TikTok Live stream for buyer intent signals in real-time.
                </p>
                <button 
                  onClick={() => setCurrentPage('live-tools')}
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#FF3B5C] to-[#FF6B8A] text-white rounded-2xl hover:from-[#E63350] hover:to-[#FF3B5C] transition-all duration-500 font-bold text-lg flex items-center justify-center space-x-3 shadow-2xl hover:shadow-3xl backdrop-blur-sm border border-[#FF3B5C]/50 hover:scale-105"
                >
                  <span>Go Live</span>
                  <ArrowRight size={20} />
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50/60 via-blue-50/40 to-indigo-50/60 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-blue-200/60 hover:shadow-3xl transition-all duration-500">
                <div className="w-20 h-20 bg-blue-100/80 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 shadow-xl border border-blue-200/50">
                  <BarChart3 size={32} className="text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-space-grotesk mb-4 tracking-tight">
                  View Insights
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium">
                  Analyze your stream performance and discover trends in viewer behavior.
                </p>
                <button 
                  onClick={() => setCurrentPage('insights')}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-500 font-bold text-lg flex items-center justify-center space-x-3 shadow-2xl hover:shadow-3xl backdrop-blur-sm border border-blue-500/50 hover:scale-105"
                >
                  <span>View Analytics</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'live-tools':
        return <LiveAnalyticsDashboard />;
      
      case 'replays':
        return (
          <div className="p-10 space-y-10">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold text-gray-900 font-space-grotesk tracking-tight">
                Stream Replays
              </h1>
              <p className="text-2xl text-gray-600 leading-relaxed font-medium">
                Timestamped buyer signals linked to TikTok rewatch
              </p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-16 shadow-2xl border border-white/40 text-center hover:shadow-3xl transition-all duration-500">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100/80 to-indigo-100/80 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-xl border border-purple-200/50">
                <Play size={36} className="text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 font-space-grotesk mb-6 tracking-tight">
                Replays Coming Soon
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
                View timestamped buyer signals and jump directly to those moments in your TikTok replays. 
                Perfect for following up with interested viewers.
              </p>
              <div className="mt-10 inline-flex items-center space-x-3 text-purple-600 font-bold bg-purple-50/60 backdrop-blur-sm px-6 py-3 rounded-2xl border border-purple-200/60">
                <Clock size={20} />
                <span className="text-lg">Expected in next update</span>
              </div>
            </div>
          </div>
        );
      
      case 'insights':
        return (
          <div className="p-10 space-y-10">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold text-gray-900 font-space-grotesk tracking-tight">
                Performance Insights
              </h1>
              <p className="text-2xl text-gray-600 leading-relaxed font-medium">
                Stream performance and conversion analytics
              </p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-16 shadow-2xl border border-white/40 text-center hover:shadow-3xl transition-all duration-500">
              <div className="w-24 h-24 bg-gradient-to-br from-green-100/80 to-emerald-100/80 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-xl border border-green-200/50">
                <BarChart3 size={36} className="text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 font-space-grotesk mb-6 tracking-tight">
                Advanced Insights Coming Soon
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
                Deep dive into your stream performance with trend analysis, conversion metrics, 
                and actionable recommendations to boost your sales.
              </p>
              <div className="mt-10 inline-flex items-center space-x-3 text-green-600 font-bold bg-green-50/60 backdrop-blur-sm px-6 py-3 rounded-2xl border border-green-200/60">
                <TrendingUp size={20} />
                <span className="text-lg">Advanced analytics in development</span>
              </div>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="p-10 space-y-10">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold text-gray-900 font-space-grotesk tracking-tight">
                Settings
              </h1>
              <p className="text-2xl text-gray-600 leading-relaxed font-medium">
                TikTok connection and preferences
              </p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-16 shadow-2xl border border-white/40 text-center hover:shadow-3xl transition-all duration-500">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100/80 to-slate-100/80 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-xl border border-gray-200/50">
                <span className="text-4xl">⚙️</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 font-space-grotesk mb-6 tracking-tight">
                Settings Panel Coming Soon
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
                Manage your TikTok connection, notification preferences, account settings, 
                and customize your dashboard experience.
              </p>
              <div className="mt-10 inline-flex items-center space-x-3 text-gray-600 font-bold bg-gray-50/60 backdrop-blur-sm px-6 py-3 rounded-2xl border border-gray-200/60">
                <span>🔧</span>
                <span className="text-lg">Configuration options in development</span>
              </div>
            </div>
          </div>
        );
      
      case 'help':
        return (
          <div className="p-10 space-y-10">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold text-gray-900 font-space-grotesk tracking-tight">
                Help & Support
              </h1>
              <p className="text-2xl text-gray-600 leading-relaxed font-medium">
                Setup guide, FAQ, and support resources
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500 group">
                <div className="w-20 h-20 bg-blue-100/80 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500 shadow-xl border border-blue-200/50">
                  <BookOpen size={32} className="text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-space-grotesk mb-6 tracking-tight">
                  Setup Guide
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium">
                  Learn how to connect your TikTok account and start analyzing your live streams effectively.
                </p>
                <button className="text-[#FF3B5C] font-bold hover:text-[#E63350] transition-all duration-300 flex items-center space-x-3 group bg-[#FF3B5C]/10 backdrop-blur-sm px-6 py-3 rounded-2xl border border-[#FF3B5C]/20 hover:bg-[#FF3B5C]/20">
                  <span className="text-lg">Read Guide</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500 group">
                <div className="w-20 h-20 bg-green-100/80 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500 shadow-xl border border-green-200/50">
                  <HelpCircle size={32} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-space-grotesk mb-6 tracking-tight">
                  FAQ
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium">
                  Find answers to common questions about GlassConversion features and functionality.
                </p>
                <button className="text-[#FF3B5C] font-bold hover:text-[#E63350] transition-all duration-300 flex items-center space-x-3 group bg-[#FF3B5C]/10 backdrop-blur-sm px-6 py-3 rounded-2xl border border-[#FF3B5C]/20 hover:bg-[#FF3B5C]/20">
                  <span className="text-lg">View FAQ</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500 group">
                <div className="w-20 h-20 bg-purple-100/80 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500 shadow-xl border border-purple-200/50">
                  <MessageCircle size={32} className="text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-space-grotesk mb-6 tracking-tight">
                  Contact Support
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium">
                  Get help from our team via email or live chat. We're here to help you succeed.
                </p>
                <button className="text-[#FF3B5C] font-bold hover:text-[#E63350] transition-all duration-300 flex items-center space-x-3 group bg-[#FF3B5C]/10 backdrop-blur-sm px-6 py-3 rounded-2xl border border-[#FF3B5C]/20 hover:bg-[#FF3B5C]/20">
                  <span className="text-lg">Contact Us</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500 group">
                <div className="w-20 h-20 bg-yellow-100/80 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500 shadow-xl border border-yellow-200/50">
                  <Play size={32} className="text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-space-grotesk mb-6 tracking-tight">
                  Video Tutorials
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium">
                  Watch step-by-step tutorials on using GlassConversion effectively for maximum results.
                </p>
                <button className="text-[#FF3B5C] font-bold hover:text-[#E63350] transition-all duration-300 flex items-center space-x-3 group bg-[#FF3B5C]/10 backdrop-blur-sm px-6 py-3 rounded-2xl border border-[#FF3B5C]/20 hover:bg-[#FF3B5C]/20">
                  <span className="text-lg">Watch Videos</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
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