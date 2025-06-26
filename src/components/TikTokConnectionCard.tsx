import React, { useState } from 'react';
import { Video, ArrowRight, AlertCircle, CheckCircle, Loader2, Zap, X } from 'lucide-react';
import { useTikTokConnection } from '../hooks/useTikTokConnection';

const TikTokConnectionCard: React.FC = () => {
  const { connectionState, connectDevHandle, connectRealTikTok, disconnect, isDevMode } = useTikTokConnection();
  const [devHandle, setDevHandle] = useState('');

  const handleDevConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    await connectDevHandle(devHandle);
    setDevHandle('');
  };

  const handleRealConnect = async () => {
    await connectRealTikTok();
  };

  if (connectionState.isConnected) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 font-space-grotesk">
                TikTok Connected
              </h3>
              <p className="text-gray-600">
                ✅ Connected to <span className="font-medium">{connectionState.tiktokHandle}</span>
              </p>
            </div>
          </div>
          
          {isDevMode && (
            <button
              onClick={disconnect}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="Disconnect (Dev Mode)"
            >
              <X size={20} />
            </button>
          )}
        </div>
        
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">
            🎉 You're ready to go live! Start your next TikTok Live stream and we'll analyze comments in real-time.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
      {/* Dev Mode Banner */}
      {isDevMode && (
        <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Zap size={16} className="text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">
              🧪 Dev Mode: Simulated TikTok Handle
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-[#FF3B5C]/10 rounded-lg flex items-center justify-center">
          <Video size={24} className="text-[#FF3B5C]" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 font-space-grotesk">
            Connect Your TikTok
          </h3>
          <p className="text-gray-600">
            {isDevMode 
              ? 'Enter a test TikTok username to simulate connection'
              : 'Link your TikTok account to start analyzing live streams'
            }
          </p>
        </div>
      </div>

      {/* Error Message */}
      {connectionState.error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle size={16} className="text-red-600" />
            <span className="text-sm text-red-800">{connectionState.error}</span>
          </div>
        </div>
      )}

      {isDevMode ? (
        /* Dev Mode: Input Field */
        <form onSubmit={handleDevConnect} className="space-y-4">
          <div>
            <label htmlFor="devHandle" className="block text-sm font-medium text-gray-700 mb-2">
              Enter test TikTok username
            </label>
            <input
              id="devHandle"
              type="text"
              value={devHandle}
              onChange={(e) => setDevHandle(e.target.value)}
              placeholder="e.g., glass_seller_live"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF3B5C] focus:border-transparent transition-colors"
              disabled={connectionState.isLoading}
            />
            <p className="mt-1 text-xs text-gray-500">
              Don't include the @ symbol - we'll add it automatically
            </p>
          </div>
          
          <button
            type="submit"
            disabled={connectionState.isLoading || !devHandle.trim()}
            className="w-full px-6 py-3 bg-[#FF3B5C] text-white rounded-lg hover:bg-[#E63350] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {connectionState.isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <span>Connect This Handle</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>
      ) : (
        /* Production Mode: TikTok OAuth Button */
        <button
          onClick={handleRealConnect}
          disabled={connectionState.isLoading}
          className="w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
        >
          {connectionState.isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                <div className="w-4 h-4 bg-black rounded-sm"></div>
              </div>
              <span>Connect Your TikTok</span>
              <ArrowRight size={20} />
            </>
          )}
        </button>
      )}

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Privacy:</strong> We'll never message your followers or access private data. 
          TikTok connection keeps your account safe and compliant.
        </p>
      </div>
    </div>
  );
};

export default TikTokConnectionCard;