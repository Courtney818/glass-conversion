import React, { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import LiveAnalyticsDashboard from './LiveAnalyticsDashboard';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 font-space-grotesk mb-2">
                Dashboard Overview
              </h1>
              <p className="text-lg text-gray-600">
                Your TikTok Live analytics at a glance
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-bold">47</span>
                  </div>
                  <span className="text-sm text-gray-500">This week</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">47</div>
                <div className="text-sm text-gray-600">Buying signals detected</div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-bold">23</span>
                  </div>
                  <span className="text-sm text-gray-500">Last stream</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">23%</div>
                <div className="text-sm text-gray-600">Intent rate</div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <span className="text-sm text-gray-500">This month</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">3</div>
                <div className="text-sm text-gray-600">Streams analyzed</div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-[#FF3B5C]/10 rounded-lg flex items-center justify-center">
                    <span className="text-[#FF3B5C] font-bold">89</span>
                  </div>
                  <span className="text-sm text-gray-500">Average</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">89%</div>
                <div className="text-sm text-gray-600">Prompt usage</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
              <h2 className="text-xl font-bold text-gray-900 font-space-grotesk mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50/50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Stream completed</p>
                    <p className="text-sm text-gray-600">47 buying signals detected • 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50/50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">New keyword trending</p>
                    <p className="text-sm text-gray-600">"shipping" mentioned 23 times • 5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50/50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">TikTok handle updated</p>
                    <p className="text-sm text-gray-600">Connected @devmode • 1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'live-tools':
        return <LiveAnalyticsDashboard />;
      
      case 'replays':
        return (
          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 font-space-grotesk mb-2">
                Stream Replays
              </h1>
              <p className="text-lg text-gray-600">
                Timestamped buyer signals linked to TikTok rewatch
              </p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-sm border border-white/20 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎬</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Replays Coming Soon</h3>
              <p className="text-gray-600">
                View timestamped buyer signals and jump directly to those moments in your TikTok replays.
              </p>
            </div>
          </div>
        );
      
      case 'insights':
        return (
          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 font-space-grotesk mb-2">
                Performance Insights
              </h1>
              <p className="text-lg text-gray-600">
                Stream performance and conversion analytics
              </p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-sm border border-white/20 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Insights Coming Soon</h3>
              <p className="text-gray-600">
                Deep dive into your stream performance with trend analysis and conversion metrics.
              </p>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 font-space-grotesk mb-2">
                Settings
              </h1>
              <p className="text-lg text-gray-600">
                TikTok connection and preferences
              </p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-sm border border-white/20 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Settings Panel Coming Soon</h3>
              <p className="text-gray-600">
                Manage your TikTok connection, notification preferences, and account settings.
              </p>
            </div>
          </div>
        );
      
      case 'help':
        return (
          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 font-space-grotesk mb-2">
                Help & Support
              </h1>
              <p className="text-lg text-gray-600">
                Setup guide, FAQ, and support resources
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Setup Guide</h3>
                <p className="text-gray-600 mb-4">
                  Learn how to connect your TikTok account and start analyzing your live streams.
                </p>
                <button className="text-[#FF3B5C] font-medium hover:underline">
                  Read Guide →
                </button>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">❓</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">FAQ</h3>
                <p className="text-gray-600 mb-4">
                  Find answers to common questions about GlassConversion features.
                </p>
                <button className="text-[#FF3B5C] font-medium hover:underline">
                  View FAQ →
                </button>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Support</h3>
                <p className="text-gray-600 mb-4">
                  Get help from our team via email or live chat.
                </p>
                <button className="text-[#FF3B5C] font-medium hover:underline">
                  Contact Us →
                </button>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🎥</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Tutorials</h3>
                <p className="text-gray-600 mb-4">
                  Watch step-by-step tutorials on using GlassConversion effectively.
                </p>
                <button className="text-[#FF3B5C] font-medium hover:underline">
                  Watch Videos →
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      <DashboardSidebar
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
      />
      
      <main className={`flex-1 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      }`}>
        {renderPageContent()}
      </main>
    </div>
  );
};

export default DashboardLayout;