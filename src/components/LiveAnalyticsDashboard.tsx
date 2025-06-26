import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  MessageSquare, 
  Clock, 
  Zap, 
  Target, 
  Users, 
  Eye, 
  ArrowUp, 
  ArrowDown,
  Flame,
  AlertCircle,
  CheckCircle,
  Copy,
  RefreshCw,
  BarChart3,
  Activity,
  Hash,
  Mic,
  Play,
  Pause,
  Volume2,
  LogOut
} from 'lucide-react';

interface BuyerSignal {
  id: string;
  timestamp: string;
  intensity: 'high' | 'medium' | 'low';
  summary: string;
  keywords: string[];
  viewerCount: number;
}

interface StreamMetrics {
  totalComments: number;
  intentPercentage: number;
  missedMoments: number;
  promptUsage: number;
  peakViewers: number;
  currentViewers: number;
  streamDuration: string;
}

interface IntentPulseData {
  timestamp: string;
  intensity: number;
  isHot: boolean;
}

const LiveAnalyticsDashboard: React.FC = () => {
  const [isLive, setIsLive] = useState(true);
  const [streamMetrics, setStreamMetrics] = useState<StreamMetrics>({
    totalComments: 1247,
    intentPercentage: 23,
    missedMoments: 3,
    promptUsage: 67,
    peakViewers: 892,
    currentViewers: 634,
    streamDuration: '1h 23m'
  });

  const [intentPulseData, setIntentPulseData] = useState<IntentPulseData[]>([
    { timestamp: '0:00', intensity: 15, isHot: false },
    { timestamp: '0:05', intensity: 32, isHot: false },
    { timestamp: '0:10', intensity: 78, isHot: true },
    { timestamp: '0:15', intensity: 45, isHot: false },
    { timestamp: '0:20', intensity: 89, isHot: true },
    { timestamp: '0:25', intensity: 23, isHot: false },
    { timestamp: '0:30', intensity: 67, isHot: true },
    { timestamp: '0:35', intensity: 34, isHot: false },
    { timestamp: '0:40', intensity: 91, isHot: true },
    { timestamp: '0:45', intensity: 28, isHot: false },
  ]);

  const [buyerSignals, setBuyerSignals] = useState<BuyerSignal[]>([
    {
      id: '1',
      timestamp: '14:23',
      intensity: 'high',
      summary: 'Asked about shipping to Canada',
      keywords: ['shipping', 'canada', 'delivery'],
      viewerCount: 634
    },
    {
      id: '2',
      timestamp: '12:45',
      intensity: 'high',
      summary: 'Multiple size inquiries',
      keywords: ['size', 'medium', 'large'],
      viewerCount: 598
    },
    {
      id: '3',
      timestamp: '11:02',
      intensity: 'medium',
      summary: 'Price comparison question',
      keywords: ['price', 'cost', 'how much'],
      viewerCount: 567
    },
    {
      id: '4',
      timestamp: '09:18',
      intensity: 'high',
      summary: 'Ready to buy - asking for link',
      keywords: ['buy', 'link', 'purchase'],
      viewerCount: 523
    },
    {
      id: '5',
      timestamp: '07:34',
      intensity: 'medium',
      summary: 'Color availability question',
      keywords: ['color', 'blue', 'available'],
      viewerCount: 489
    }
  ]);

  const [trendingKeywords] = useState([
    { word: 'shipping', count: 47, trend: 'up' },
    { word: 'size', count: 34, trend: 'up' },
    { word: 'price', count: 28, trend: 'down' },
    { word: 'buy', count: 23, trend: 'up' },
    { word: 'link', count: 19, trend: 'up' },
    { word: 'color', count: 16, trend: 'stable' },
    { word: 'delivery', count: 12, trend: 'up' },
    { word: 'discount', count: 8, trend: 'down' }
  ]);

  const [suggestedPrompts] = useState([
    {
      id: '1',
      trigger: 'High shipping interest',
      prompt: "Say this: 'Free shipping on orders over $50! Comment SHIP for details'",
      urgency: 'high',
      used: false
    },
    {
      id: '2',
      trigger: 'Size questions trending',
      prompt: "Say this: 'Size chart in my bio! Comment SIZE + your measurements'",
      urgency: 'medium',
      used: true
    },
    {
      id: '3',
      trigger: 'Price sensitivity detected',
      prompt: "Say this: 'Limited time: 20% off for live viewers! Comment LIVE20'",
      urgency: 'high',
      used: false
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      // Update metrics
      setStreamMetrics(prev => ({
        ...prev,
        totalComments: prev.totalComments + Math.floor(Math.random() * 5),
        currentViewers: prev.currentViewers + Math.floor(Math.random() * 20 - 10),
        intentPercentage: Math.max(15, Math.min(35, prev.intentPercentage + Math.floor(Math.random() * 6 - 3)))
      }));

      // Add new pulse data point
      setIntentPulseData(prev => {
        const newIntensity = Math.floor(Math.random() * 100);
        const newPoint = {
          timestamp: new Date().toLocaleTimeString('en-US', { 
            hour12: false, 
            minute: '2-digit', 
            second: '2-digit' 
          }),
          intensity: newIntensity,
          isHot: newIntensity > 70
        };
        return [...prev.slice(-9), newPoint];
      });

      // Occasionally add new buyer signals
      if (Math.random() < 0.3) {
        const newSignal: BuyerSignal = {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleTimeString('en-US', { 
            hour12: false, 
            minute: '2-digit', 
            second: '2-digit' 
          }),
          intensity: Math.random() > 0.6 ? 'high' : 'medium',
          summary: [
            'Asked about payment options',
            'Wants to know about returns',
            'Interested in bulk pricing',
            'Asking for discount code',
            'Ready to purchase now'
          ][Math.floor(Math.random() * 5)],
          keywords: ['payment', 'buy', 'price'],
          viewerCount: streamMetrics.currentViewers
        };
        setBuyerSignals(prev => [newSignal, ...prev.slice(0, 4)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive, streamMetrics.currentViewers]);

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'high': return 'bg-red-50 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-gray-50 text-gray-800 border-gray-200';
      default: return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp size={12} className="text-green-600" />;
      case 'down': return <ArrowDown size={12} className="text-red-600" />;
      default: return <div className="w-3 h-3 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      {/* Status Banner */}
      <div className={`w-full px-8 py-4 ${isLive ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-gray-500 to-gray-600'} text-white shadow-lg`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              {isLive ? (
                <>
                  <div className="w-4 h-4 bg-white rounded-full animate-pulse shadow-lg"></div>
                  <span className="font-bold text-lg">LIVE</span>
                </>
              ) : (
                <>
                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  <span className="font-bold text-lg">OFFLINE</span>
                </>
              )}
            </div>
            <span className="text-white/90 font-medium">Ready to Stream — Monitoring @glass_seller_live</span>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-sm text-white/80 font-medium">{streamMetrics.streamDuration}</span>
            <button
              onClick={() => setIsLive(!isLive)}
              className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300 flex items-center space-x-2 font-medium"
            >
              {isLive ? <Pause size={16} /> : <Play size={16} />}
              <span>{isLive ? 'Pause' : 'Resume'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            
            {/* Stream Scorecard */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/30">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 font-space-grotesk">Stream Scorecard</h2>
                  <p className="text-gray-600 mt-2">Real-time performance metrics</p>
                </div>
                <button className="p-3 text-gray-400 hover:text-gray-600 transition-colors rounded-xl hover:bg-gray-100">
                  <RefreshCw size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <MessageSquare size={28} className="text-blue-600" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{streamMetrics.totalComments.toLocaleString()}</div>
                  <div className="text-sm font-medium text-gray-600">Total Comments</div>
                </div>
                
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Target size={28} className="text-green-600" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{streamMetrics.intentPercentage}%</div>
                  <div className="text-sm font-medium text-gray-600">Intent Rate</div>
                </div>
                
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-pink-100 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <AlertCircle size={28} className="text-red-600" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{streamMetrics.missedMoments}</div>
                  <div className="text-sm font-medium text-gray-600">Missed Moments</div>
                </div>
                
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-violet-100 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Mic size={28} className="text-purple-600" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{streamMetrics.promptUsage}%</div>
                  <div className="text-sm font-medium text-gray-600">Prompt Usage</div>
                </div>
              </div>
            </div>

            {/* Live Intent Pulse Graph */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/30">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-[#FF3B5C]/10 rounded-2xl flex items-center justify-center">
                    <Activity size={24} className="text-[#FF3B5C]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 font-space-grotesk">Live Intent Pulse</h3>
                    <p className="text-gray-600">Real-time buyer interest spikes</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-[#FF3B5C] rounded-full shadow-lg shadow-[#FF3B5C]/50"></div>
                    <span className="text-sm font-medium text-gray-600">HOT Zone</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-100 px-4 py-2 rounded-xl">
                    <Users size={16} className="text-gray-500" />
                    <span className="text-sm font-bold text-gray-900">{streamMetrics.currentViewers}</span>
                  </div>
                </div>
              </div>
              
              <div className="relative h-40 mb-6">
                <div className="absolute inset-0 flex items-end justify-between space-x-2">
                  {intentPulseData.map((point, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className={`w-full rounded-t-xl transition-all duration-500 shadow-lg ${
                          point.isHot 
                            ? 'bg-gradient-to-t from-[#FF3B5C] to-[#FF6B8A] shadow-[#FF3B5C]/30' 
                            : 'bg-gradient-to-t from-blue-400 to-blue-500 shadow-blue-500/20'
                        }`}
                        style={{ height: `${point.intensity}%` }}
                      >
                        {point.isHot && (
                          <div className="w-full h-full flex items-start justify-center pt-2">
                            <Flame size={14} className="text-white animate-pulse" />
                          </div>
                        )}
                      </div>
                      <span className="text-xs font-medium text-gray-500 mt-3">{point.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm font-medium text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
                <span>Low Interest</span>
                <span>High Interest</span>
              </div>
            </div>

            {/* Buyer Signal Cards */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/30">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                    <Zap size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 font-space-grotesk">Buyer Signals</h3>
                    <p className="text-gray-600">High-intent moments detected</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
              
              <div className="space-y-4">
                {buyerSignals.map((signal) => (
                  <div key={signal.id} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <span className="font-mono text-sm font-bold text-gray-700 bg-gray-100 px-3 py-2 rounded-xl">
                            {signal.timestamp}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getIntensityColor(signal.intensity)}`}>
                            {signal.intensity.toUpperCase()}
                          </span>
                          <div className="flex items-center space-x-2 text-gray-500">
                            <Eye size={14} />
                            <span className="text-xs font-medium">{signal.viewerCount}</span>
                          </div>
                        </div>
                        <p className="text-gray-800 font-semibold mb-3">{signal.summary}</p>
                        <div className="flex flex-wrap gap-2">
                          {signal.keywords.map((keyword, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-xl text-xs font-semibold border border-blue-200">
                              #{keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-[#FF3B5C] transition-colors rounded-xl hover:bg-gray-100 group-hover:scale-110">
                        <ArrowUp size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Keyword Radar */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/30">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center">
                  <Hash size={24} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 font-space-grotesk">Keyword Radar</h3>
                  <p className="text-gray-600">Trending product keywords</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {trendingKeywords.map((keyword, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                    <span className="font-bold text-gray-800">#{keyword.word}</span>
                    <span className="text-sm font-medium text-gray-600">({keyword.count})</span>
                    <div className="group-hover:scale-125 transition-transform duration-300">
                      {getTrendIcon(keyword.trend)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sales Prompt Panel */}
          <div className="col-span-12 lg:col-span-4">
            <div className="sticky top-8 bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/30">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-14 h-14 bg-[#FF3B5C]/10 rounded-2xl flex items-center justify-center">
                  <Volume2 size={24} className="text-[#FF3B5C]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 font-space-grotesk">Sales Prompts</h3>
                  <p className="text-gray-600">AI-suggested call-to-actions</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {suggestedPrompts.map((prompt) => (
                  <div key={prompt.id} className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                    prompt.urgency === 'high' 
                      ? 'border-red-200 bg-gradient-to-br from-red-50 to-pink-50' 
                      : 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50'
                  } ${prompt.used ? 'opacity-60' : 'hover:shadow-lg'}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          prompt.urgency === 'high' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {prompt.urgency.toUpperCase()}
                        </span>
                        {prompt.used && (
                          <CheckCircle size={16} className="text-green-600" />
                        )}
                      </div>
                      <button 
                        onClick={() => copyPrompt(prompt.prompt)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-xl hover:bg-white/50"
                        disabled={prompt.used}
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                    
                    <div className="text-xs font-bold text-gray-600 mb-3 uppercase tracking-wide">
                      {prompt.trigger}
                    </div>
                    
                    <div className="text-sm text-gray-800 font-semibold leading-relaxed mb-4">
                      {prompt.prompt}
                    </div>
                    
                    {!prompt.used && (
                      <button className={`w-full px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
                        prompt.urgency === 'high'
                          ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl'
                          : 'bg-yellow-600 text-white hover:bg-yellow-700 shadow-lg hover:shadow-xl'
                      }`}>
                        Use This Prompt
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                <div className="flex items-center space-x-3 mb-3">
                  <TrendingUp size={16} className="text-blue-600" />
                  <span className="text-sm font-bold text-blue-900">Performance Tip</span>
                </div>
                <p className="text-sm text-blue-800 leading-relaxed">
                  Your intent rate is {streamMetrics.intentPercentage}%. Try using more specific product prompts to boost engagement!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveAnalyticsDashboard;