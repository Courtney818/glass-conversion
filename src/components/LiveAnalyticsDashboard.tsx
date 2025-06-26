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
      case 'high': return 'bg-red-50/80 text-red-800 border-red-200/60';
      case 'medium': return 'bg-yellow-50/80 text-yellow-800 border-yellow-200/60';
      case 'low': return 'bg-gray-50/80 text-gray-800 border-gray-200/60';
      default: return 'bg-gray-50/80 text-gray-800 border-gray-200/60';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30">
      {/* Status Banner */}
      <div className={`w-full px-8 py-5 ${isLive ? 'bg-gradient-to-r from-red-500/95 via-red-600/95 to-pink-600/95' : 'bg-gradient-to-r from-gray-500/95 via-gray-600/95 to-slate-600/95'} backdrop-blur-xl text-white shadow-2xl border-b border-white/20`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-4">
              {isLive ? (
                <>
                  <div className="w-5 h-5 bg-white/90 rounded-full animate-pulse shadow-lg shadow-white/50"></div>
                  <span className="font-bold text-xl tracking-wide">LIVE</span>
                </>
              ) : (
                <>
                  <div className="w-5 h-5 bg-white/60 rounded-full"></div>
                  <span className="font-bold text-xl tracking-wide">OFFLINE</span>
                </>
              )}
            </div>
            <div className="h-6 w-px bg-white/30"></div>
            <span className="text-white/90 font-medium text-lg">Ready to Stream — Monitoring @glass_seller_live</span>
          </div>
          <div className="flex items-center space-x-8">
            <span className="text-sm text-white/80 font-semibold bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm">{streamMetrics.streamDuration}</span>
            <button
              onClick={() => setIsLive(!isLive)}
              className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-2xl hover:bg-white/30 transition-all duration-300 flex items-center space-x-3 font-semibold border border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl"
            >
              {isLive ? <Pause size={18} /> : <Play size={18} />}
              <span className="text-lg">{isLive ? 'Pause' : 'Resume'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8 space-y-8">
        <div className="grid grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            
            {/* Stream Scorecard */}
            <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500">
              <div className="flex items-center justify-between mb-10">
                <div className="space-y-3">
                  <h2 className="text-4xl font-bold text-gray-900 font-space-grotesk tracking-tight">Stream Scorecard</h2>
                  <p className="text-lg text-gray-600 font-medium">Real-time performance metrics</p>
                </div>
                <button className="p-4 text-gray-400 hover:text-gray-600 transition-all duration-300 rounded-2xl hover:bg-white/60 backdrop-blur-sm border border-transparent hover:border-white/60 shadow-lg hover:shadow-xl">
                  <RefreshCw size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center group">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100/80 to-indigo-100/80 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-500 shadow-xl border border-blue-200/50 group-hover:shadow-2xl">
                    <MessageSquare size={32} className="text-blue-600" />
                  </div>
                  <div className="text-5xl font-bold text-gray-900 mb-3 tracking-tight">{streamMetrics.totalComments.toLocaleString()}</div>
                  <div className="text-base font-semibold text-gray-600">Total Comments</div>
                </div>
                
                <div className="text-center group">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-100/80 to-emerald-100/80 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-500 shadow-xl border border-green-200/50 group-hover:shadow-2xl">
                    <Target size={32} className="text-green-600" />
                  </div>
                  <div className="text-5xl font-bold text-gray-900 mb-3 tracking-tight">{streamMetrics.intentPercentage}%</div>
                  <div className="text-base font-semibold text-gray-600">Intent Rate</div>
                </div>
                
                <div className="text-center group">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-100/80 to-pink-100/80 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-500 shadow-xl border border-red-200/50 group-hover:shadow-2xl">
                    <AlertCircle size={32} className="text-red-600" />
                  </div>
                  <div className="text-5xl font-bold text-gray-900 mb-3 tracking-tight">{streamMetrics.missedMoments}</div>
                  <div className="text-base font-semibold text-gray-600">Missed Moments</div>
                </div>
                
                <div className="text-center group">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-100/80 to-violet-100/80 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-500 shadow-xl border border-purple-200/50 group-hover:shadow-2xl">
                    <Mic size={32} className="text-purple-600" />
                  </div>
                  <div className="text-5xl font-bold text-gray-900 mb-3 tracking-tight">{streamMetrics.promptUsage}%</div>
                  <div className="text-base font-semibold text-gray-600">Prompt Usage</div>
                </div>
              </div>
            </div>

            {/* Live Intent Pulse Graph */}
            <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-[#FF3B5C]/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-[#FF3B5C]/30 shadow-lg">
                    <Activity size={28} className="text-[#FF3B5C]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-gray-900 font-space-grotesk tracking-tight">Live Intent Pulse</h3>
                    <p className="text-lg text-gray-600 font-medium">Real-time buyer interest spikes</p>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-4 bg-gradient-to-r from-[#FF3B5C]/10 to-[#FF6B8A]/10 px-6 py-3 rounded-2xl border border-[#FF3B5C]/20 backdrop-blur-sm">
                    <div className="w-4 h-4 bg-[#FF3B5C] rounded-full shadow-lg shadow-[#FF3B5C]/50 animate-pulse"></div>
                    <span className="text-base font-bold text-[#FF3B5C]">HOT Zone</span>
                  </div>
                  <div className="flex items-center space-x-4 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/60 shadow-lg">
                    <Users size={20} className="text-gray-500" />
                    <span className="text-lg font-bold text-gray-900">{streamMetrics.currentViewers}</span>
                  </div>
                </div>
              </div>
              
              <div className="relative h-48 mb-8 bg-gradient-to-t from-gray-50/50 to-transparent rounded-2xl p-6 border border-gray-200/30">
                <div className="absolute inset-6 flex items-end justify-between space-x-3">
                  {intentPulseData.map((point, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className={`w-full rounded-t-2xl transition-all duration-700 shadow-lg border-t-2 ${
                          point.isHot 
                            ? 'bg-gradient-to-t from-[#FF3B5C]/90 via-[#FF3B5C]/80 to-[#FF6B8A]/70 shadow-[#FF3B5C]/40 border-[#FF3B5C]/60' 
                            : 'bg-gradient-to-t from-blue-400/80 via-blue-500/70 to-blue-600/60 shadow-blue-500/30 border-blue-400/50'
                        }`}
                        style={{ height: `${point.intensity}%` }}
                      >
                        {point.isHot && (
                          <div className="w-full h-full flex items-start justify-center pt-3">
                            <Flame size={16} className="text-white animate-pulse drop-shadow-lg" />
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-bold text-gray-500 mt-4 bg-white/60 px-2 py-1 rounded-lg backdrop-blur-sm">{point.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-base font-bold text-gray-600 bg-gradient-to-r from-gray-50/60 to-gray-100/60 backdrop-blur-sm px-6 py-4 rounded-2xl border border-gray-200/40">
                <span>Low Interest</span>
                <span>High Interest</span>
              </div>
            </div>

            {/* Buyer Signal Cards */}
            <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-green-100/80 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-green-200/50 shadow-lg">
                    <Zap size={28} className="text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-gray-900 font-space-grotesk tracking-tight">Buyer Signals</h3>
                    <p className="text-lg text-gray-600 font-medium">High-intent moments detected</p>
                  </div>
                </div>
                <div className="text-base font-bold text-gray-500 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/60 shadow-lg">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
              
              <div className="space-y-6">
                {buyerSignals.map((signal) => (
                  <div key={signal.id} className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 border border-white/60 hover:shadow-2xl transition-all duration-500 group hover:bg-white/70">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-6">
                        <div className="flex items-center space-x-6">
                          <span className="font-mono text-base font-bold text-gray-700 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-2xl border border-gray-200/60 shadow-lg">
                            {signal.timestamp}
                          </span>
                          <span className={`px-4 py-2 rounded-2xl text-sm font-bold border backdrop-blur-sm ${getIntensityColor(signal.intensity)} shadow-lg`}>
                            {signal.intensity.toUpperCase()}
                          </span>
                          <div className="flex items-center space-x-3 text-gray-500 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-2xl border border-gray-200/40">
                            <Eye size={16} />
                            <span className="text-sm font-bold">{signal.viewerCount}</span>
                          </div>
                        </div>
                        <p className="text-xl text-gray-800 font-bold leading-relaxed">{signal.summary}</p>
                        <div className="flex flex-wrap gap-3">
                          {signal.keywords.map((keyword, index) => (
                            <span key={index} className="px-4 py-2 bg-blue-50/80 text-blue-700 rounded-2xl text-sm font-bold border border-blue-200/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                              #{keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="p-4 text-gray-400 hover:text-[#FF3B5C] transition-all duration-300 rounded-2xl hover:bg-white/60 backdrop-blur-sm border border-transparent hover:border-white/60 shadow-lg hover:shadow-xl group-hover:scale-110">
                        <ArrowUp size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Keyword Radar */}
            <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500">
              <div className="flex items-center space-x-6 mb-10">
                <div className="w-16 h-16 bg-purple-100/80 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-purple-200/50 shadow-lg">
                  <Hash size={28} className="text-purple-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-gray-900 font-space-grotesk tracking-tight">Keyword Radar</h3>
                  <p className="text-lg text-gray-600 font-medium">Trending product keywords</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-6">
                {trendingKeywords.map((keyword, index) => (
                  <div key={index} className="flex items-center space-x-4 bg-white/50 backdrop-blur-xl px-8 py-4 rounded-3xl border border-white/60 hover:shadow-2xl transition-all duration-500 group hover:bg-white/70">
                    <span className="font-bold text-lg text-gray-800">#{keyword.word}</span>
                    <span className="text-base font-bold text-gray-600 bg-gray-100/60 px-3 py-1 rounded-xl">({keyword.count})</span>
                    <div className="group-hover:scale-125 transition-transform duration-500">
                      {getTrendIcon(keyword.trend)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sales Prompt Panel */}
          <div className="col-span-12 lg:col-span-4">
            <div className="sticky top-8 bg-white/60 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500">
              <div className="flex items-center space-x-6 mb-10">
                <div className="w-16 h-16 bg-[#FF3B5C]/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-[#FF3B5C]/30 shadow-lg">
                  <Volume2 size={28} className="text-[#FF3B5C]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-gray-900 font-space-grotesk tracking-tight">Sales Prompts</h3>
                  <p className="text-lg text-gray-600 font-medium">AI-suggested call-to-actions</p>
                </div>
              </div>
              
              <div className="space-y-8">
                {suggestedPrompts.map((prompt) => (
                  <div key={prompt.id} className={`p-8 rounded-3xl border-2 transition-all duration-500 backdrop-blur-xl ${
                    prompt.urgency === 'high' 
                      ? 'border-red-200/60 bg-gradient-to-br from-red-50/60 via-red-50/40 to-pink-50/60 shadow-xl hover:shadow-2xl' 
                      : 'border-yellow-200/60 bg-gradient-to-br from-yellow-50/60 via-yellow-50/40 to-amber-50/60 shadow-xl hover:shadow-2xl'
                  } ${prompt.used ? 'opacity-60' : 'hover:scale-105'}`}>
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <span className={`px-4 py-2 rounded-2xl text-sm font-bold backdrop-blur-sm border shadow-lg ${
                          prompt.urgency === 'high' 
                            ? 'bg-red-100/80 text-red-800 border-red-200/60' 
                            : 'bg-yellow-100/80 text-yellow-800 border-yellow-200/60'
                        }`}>
                          {prompt.urgency.toUpperCase()}
                        </span>
                        {prompt.used && (
                          <CheckCircle size={20} className="text-green-600" />
                        )}
                      </div>
                      <button 
                        onClick={() => copyPrompt(prompt.prompt)}
                        className="p-3 text-gray-400 hover:text-gray-600 transition-all duration-300 rounded-2xl hover:bg-white/60 backdrop-blur-sm border border-transparent hover:border-white/60 shadow-lg hover:shadow-xl"
                        disabled={prompt.used}
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                    
                    <div className="text-sm font-bold text-gray-600 mb-4 uppercase tracking-wider bg-white/60 backdrop-blur-sm px-3 py-2 rounded-xl inline-block">
                      {prompt.trigger}
                    </div>
                    
                    <div className="text-base text-gray-800 font-bold leading-relaxed mb-6 bg-white/40 backdrop-blur-sm p-4 rounded-2xl border border-white/60">
                      {prompt.prompt}
                    </div>
                    
                    {!prompt.used && (
                      <button className={`w-full px-6 py-4 rounded-2xl font-bold transition-all duration-500 backdrop-blur-sm border shadow-xl hover:shadow-2xl hover:scale-105 ${
                        prompt.urgency === 'high'
                          ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 border-red-500/50'
                          : 'bg-gradient-to-r from-yellow-600 to-yellow-700 text-white hover:from-yellow-700 hover:to-yellow-800 border-yellow-500/50'
                      }`}>
                        Use This Prompt
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-10 p-8 bg-gradient-to-br from-blue-50/60 via-blue-50/40 to-indigo-50/60 backdrop-blur-xl rounded-3xl border border-blue-200/60 shadow-xl">
                <div className="flex items-center space-x-4 mb-4">
                  <TrendingUp size={20} className="text-blue-600" />
                  <span className="text-base font-bold text-blue-900">Performance Tip</span>
                </div>
                <p className="text-base text-blue-800 leading-relaxed font-medium">
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