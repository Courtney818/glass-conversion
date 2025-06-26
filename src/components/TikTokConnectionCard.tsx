import React, { useState, useEffect } from 'react';
import { Video, ArrowRight, AlertCircle, CheckCircle, Loader2, Zap, X, Edit3, ExternalLink, Check } from 'lucide-react';
import { useTikTokConnection } from '../hooks/useTikTokConnection';

const TikTokConnectionCard: React.FC = () => {
  const { connectionState, connectDevHandle, connectRealTikTok, disconnect, isDevMode } = useTikTokConnection();
  const [devHandle, setDevHandle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Initialize dev handle from current connection
  useEffect(() => {
    if (connectionState.isConnected && connectionState.tiktokHandle) {
      // Remove @ symbol for editing
      const handle = connectionState.tiktokHandle.startsWith('@') 
        ? connectionState.tiktokHandle.slice(1) 
        : connectionState.tiktokHandle;
      setDevHandle(handle);
    }
  }, [connectionState.isConnected, connectionState.tiktokHandle]);

  const validateTikTokHandle = async (handle: string): Promise<boolean> => {
    if (!handle.trim()) return false;
    
    try {
      setIsValidating(true);
      setValidationError(null);
      
      // Clean handle (remove @ if present)
      const cleanHandle = handle.startsWith('@') ? handle.slice(1) : handle;
      
      // Basic format validation
      if (cleanHandle.length < 2) {
        setValidationError('Username must be at least 2 characters');
        return false;
      }
      
      if (!/^[a-zA-Z0-9._]+$/.test(cleanHandle)) {
        setValidationError('Username can only contain letters, numbers, dots, and underscores');
        return false;
      }
      
      // Simulate network validation delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real implementation, you would ping the TikTok profile
      // For dev mode, we'll simulate this check
      const isValid = true; // Assume valid for dev mode
      
      return isValid;
    } catch (error) {
      console.warn('TikTok validation failed:', error);
      setValidationError('Validation failed. Please check the username manually.');
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const handleDevConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate handle first
    const isValid = await validateTikTokHandle(devHandle);
    if (!isValid) return;
    
    await connectDevHandle(devHandle);
    setIsEditing(false);
  };

  const handleDevUpdate = async () => {
    // Validate handle first
    const isValid = await validateTikTokHandle(devHandle);
    if (!isValid) return;
    
    await connectDevHandle(devHandle);
    setIsEditing(false);
  };

  const handleRealConnect = async () => {
    await connectRealTikTok();
  };

  const handleDisconnect = () => {
    disconnect();
    setDevHandle('');
    setIsEditing(false);
    setValidationError(null);
  };

  const startEditing = () => {
    setIsEditing(true);
    setValidationError(null);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setValidationError(null);
    // Reset to current handle
    if (connectionState.tiktokHandle) {
      const handle = connectionState.tiktokHandle.startsWith('@') 
        ? connectionState.tiktokHandle.slice(1) 
        : connectionState.tiktokHandle;
      setDevHandle(handle);
    }
  };

  // Dev Mode - Connected State with Edit Capability
  if (connectionState.isConnected && isDevMode) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
        {/* Dev Mode Banner */}
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Zap size={16} className="text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">
              🧪 Dev Mode Active
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle size={24} className="text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 font-space-grotesk">
                  Connected to {connectionState.tiktokHandle}
                </h3>
                {!isEditing ? (
                  <p className="text-gray-600">
                    Mock TikTok session active
                  </p>
                ) : (
                  <p className="text-gray-600">
                    Editing TikTok handle
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Edit Form */}
          {isEditing ? (
            <form onSubmit={(e) => { e.preventDefault(); handleDevUpdate(); }} className="space-y-4">
              <div>
                <label htmlFor="editHandle" className="block text-sm font-medium text-gray-700 mb-2">
                  TikTok Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">@</span>
                  </div>
                  <input
                    id="editHandle"
                    type="text"
                    value={devHandle}
                    onChange={(e) => {
                      setDevHandle(e.target.value);
                      setValidationError(null);
                    }}
                    placeholder="username"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF3B5C] focus:border-transparent transition-colors"
                    disabled={connectionState.isLoading || isValidating}
                  />
                  {isValidating && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <Loader2 size={16} className="text-gray-400 animate-spin" />
                    </div>
                  )}
                </div>
                
                {/* Validation Error */}
                {validationError && (
                  <div className="mt-2 flex items-center space-x-2 text-red-600">
                    <AlertCircle size={14} />
                    <span className="text-sm">{validationError}</span>
                  </div>
                )}
                
                {/* Validation Link */}
                {devHandle && (
                  <div className="mt-2 flex items-center space-x-2">
                    <ExternalLink size={14} className="text-gray-400" />
                    <a 
                      href={`https://www.tiktok.com/@${devHandle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Check if @{devHandle} exists on TikTok
                    </a>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={connectionState.isLoading || isValidating || !devHandle.trim()}
                  className="flex-1 px-4 py-2 bg-[#FF3B5C] text-white rounded-lg hover:bg-[#E63350] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {connectionState.isLoading || isValidating ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>{isValidating ? 'Validating...' : 'Updating...'}</span>
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      <span>Update</span>
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={cancelEditing}
                  disabled={connectionState.isLoading || isValidating}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            /* View Mode */
            <div className="flex space-x-3">
              <button
                onClick={startEditing}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <Edit3 size={16} />
                <span>Edit Handle</span>
              </button>
              
              <button
                onClick={handleDisconnect}
                className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <X size={16} />
                <span>Disconnect</span>
              </button>
            </div>
          )}

          {/* Success Message */}
          {!isEditing && (
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                ✅ Connected to {connectionState.tiktokHandle}
              </p>
            </div>
          )}

          {/* Dev Notice */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              This is a mock session for development only. No real TikTok data is linked.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Production Mode - Connected State
  if (connectionState.isConnected && !isDevMode) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
        <div className="flex items-center space-x-4 mb-4">
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
        
        <div className="p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">
            🎉 You're ready to go live! Start your next TikTok Live stream and we'll analyze comments in real-time.
          </p>
        </div>
      </div>
    );
  }

  // Not Connected State
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
      {/* Dev Mode Banner */}
      {isDevMode && (
        <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Zap size={16} className="text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">
              🧪 Dev Mode Active
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
              ? 'Not connected. Enter test TikTok handle to continue.'
              : 'Link your TikTok account to start analyzing live streams'
            }
          </p>
        </div>
      </div>

      {/* Error Message */}
      {(connectionState.error || validationError) && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle size={16} className="text-red-600" />
            <span className="text-sm text-red-800">{connectionState.error || validationError}</span>
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
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">@</span>
              </div>
              <input
                id="devHandle"
                type="text"
                value={devHandle}
                onChange={(e) => {
                  setDevHandle(e.target.value);
                  setValidationError(null);
                }}
                placeholder="glass_seller_live"
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF3B5C] focus:border-transparent transition-colors"
                disabled={connectionState.isLoading || isValidating}
              />
              {isValidating && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Loader2 size={16} className="text-gray-400 animate-spin" />
                </div>
              )}
            </div>
            
            {/* Validation Error */}
            {validationError && (
              <div className="mt-2 flex items-center space-x-2 text-red-600">
                <AlertCircle size={14} />
                <span className="text-sm">{validationError}</span>
              </div>
            )}
            
            {/* Validation Link */}
            {devHandle && (
              <div className="mt-2 flex items-center space-x-2">
                <ExternalLink size={14} className="text-gray-400" />
                <a 
                  href={`https://www.tiktok.com/@${devHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Check if @{devHandle} exists on TikTok
                </a>
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={connectionState.isLoading || isValidating || !devHandle.trim()}
            className="w-full px-6 py-3 bg-[#FF3B5C] text-white rounded-lg hover:bg-[#E63350] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {connectionState.isLoading || isValidating ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>{isValidating ? 'Validating...' : 'Connecting...'}</span>
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

      {/* Privacy Notice */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Privacy:</strong> We'll never message your followers or access private data. 
          TikTok connection keeps your account safe and compliant.
        </p>
      </div>

      {/* Dev Notice */}
      {isDevMode && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            This is a mock session for development only. No real TikTok data is linked.
          </p>
        </div>
      )}
    </div>
  );
};

export default TikTokConnectionCard;