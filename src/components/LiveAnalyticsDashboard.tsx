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
  Volume2
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
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Status Banner */}
      <div className={`w-full px-6 py-3 ${isLive ? 'bg-red-500' : 'bg-gray-500'} text-white`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {isLive ? (
                <>
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  <span className="font-semibold">LIVE</span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="font-semibold">OFFLINE</span>
                </>
              )}
            </div>
            <span className="text-white/90">Ready to Stream — Monitoring @glass_seller_live</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-white/80">{streamMetrics.streamDuration}</span>
            <button
              onClick={() => setIsLive(!isLive)}
              className="px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30 transition-colors flex items-center space-x-2"
            >
              {isLive ? <Pause size={16} /> : <Play size={16} />}
              <span className="text-sm">{isLive ? 'Pause' : 'Resume'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-12 gap-6">
          
          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            
            {/* Stream Scorecard */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 font-space-grotesk">Stream Scorecard</h2>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <RefreshCw size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <MessageSquare size={24} className="text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{streamMetrics.totalComments.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Comments</div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Target size={24} className="text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{streamMetrics.intentPercentage}%</div>
                  <div className="text-sm text-gray-600">Intent Rate</div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <AlertCircle size={24} className="text-red-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{streamMetrics.missedMoments}</div>
                  <div className="text-sm text-gray-600">Missed Moments</div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Mic size={24} className="text-purple-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{streamMetrics.promptUsage}%</div>
                  <div className="text-sm text-gray-600">Prompt Usage</div>
                </div>
              </div>
            </div>

            {/* Live Intent Pulse Graph */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#FF3B5C]/10 rounded-xl flex items-center justify-center">
                    <Activity size={20} className="text-[#FF3B5C]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 font-space-grotesk">Live Intent Pulse</h3>
                    <p className="text-sm text-gray-600">Real-time buyer interest spikes</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#FF3B5C] rounded-full"></div>
                    <span className="text-sm text-gray-600">HOT Zone</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users size={16} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">{streamMetrics.currentViewers}</span>
                  </div>
                </div>
              </div>
              
              <div className="relative h-32">
                <div className="absolute inset-0 flex items-end justify-between space-x-1">
                  {intentPulseData.map((point, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className={`w-full rounded-t-lg transition-all duration-500 ${
                          point.isHot 
                            ? 'bg-gradient-to-t from-[#FF3B5C] to-[#FF6B8A] shadow-lg' 
                            : 'bg-gradient-to-t from-blue-400 to-blue-500'
                        }`}
                        style={{ height: `${point.intensity}%` }}
                      >
                        {point.isHot && (
                          <div className="w-full h-full flex items-start justify-center pt-1">
                            <Flame size={12} className="text-white animate-pulse" />
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 mt-2">{point.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                <span>Low Interest</span>
                <span>High Interest</span>
              </div>
            </div>

            {/* Buyer Signal Cards */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Zap size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 font-space-grotesk">Buyer Signals</h3>
                    <p className="text-sm text-gray-600">High-intent moments detected</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
              
              <div className="space-y-4">
                {buyerSignals.map((signal) => (
                  <div key={signal.id} className="bg-white/60 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="font-mono text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                            {signal.timestamp}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getIntensityColor(signal.intensity)}`}>
                            {signal.intensity.toUpperCase()}
                          </span>
                          <div className="flex items-center space-x-1 text-gray-500">
                            <Eye size={14} />
                            <span className="text-xs">{signal.viewerCount}</span>
                          </div>
                        </div>
                        <p className="text-gray-800 font-medium mb-2">{signal.summary}</p>
                        <div className="flex flex-wrap gap-2">
                          {signal.keywords.map((keyword, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                              #{keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-[#FF3B5C] transition-colors">
                        <ArrowUp size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Keyword Radar */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Hash size={20} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 font-space-grotesk">Keyword Radar</h3>
                  <p className="text-sm text-gray-600">Trending product keywords</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {trendingKeywords.map((keyword, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-white/60 px-4 py-2 rounded-xl border border-gray-100">
                    <span className="font-medium text-gray-800">#{keyword.word}</span>
                    <span className="text-sm text-gray-600">({keyword.count})</span>
                    {getTrendIcon(keyword.trend)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sales Prompt Panel */}
          <div className="col-span-12 lg:col-span-4">
            <div className="sticky top-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-[#FF3B5C]/10 rounded-xl flex items-center justify-center">
                  <Volume2 size={20} className="text-[#FF3B5C]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 font-space-grotesk">Sales Prompts</h3>
                  <p className="text-sm text-gray-600">AI-suggested call-to-actions</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {suggestedPrompts.map((prompt) => (
                  <div key={prompt.id} className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    prompt.urgency === 'high' 
                      ? 'border-red-200 bg-red-50' 
                      : 'border-yellow-200 bg-yellow-50'
                  } ${prompt.used ? 'opacity-60' : 'hover:shadow-md'}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        disabled={prompt.used}
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                    
                    <div className="text-xs text-gray-600 mb-2 font-medium">
                      {prompt.trigger}
                    </div>
                    
                    <div className="text-sm text-gray-800 font-medium leading-relaxed">
                      {prompt.prompt}
                    </div>
                    
                    {!prompt.used && (
                      <button className={`w-full mt-3 px-4 py-2 rounded-lg font-medium transition-colors ${
                        prompt.urgency === 'high'
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-yellow-600 text-white hover:bg-yellow-700'
                      }`}>
                        Use This Prompt
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp size={16} className="text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Performance Tip</span>
                </div>
                <p className="text-sm text-blue-800">
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