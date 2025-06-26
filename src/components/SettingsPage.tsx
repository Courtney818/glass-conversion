import React, { useState } from 'react';
import { 
  Settings, 
  Bell, 
  Layout, 
  User, 
  Shield, 
  ExternalLink, 
  Trash2, 
  LogOut, 
  CheckCircle, 
  XCircle, 
  Edit3, 
  Save, 
  X, 
  AlertTriangle,
  Zap,
  Clock,
  Eye,
  Hash,
  BarChart3,
  Smartphone,
  Mail,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTikTokConnection } from '../hooks/useTikTokConnection';
import TikTokConnectionCard from './TikTokConnectionCard';

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  disabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ enabled, onChange, disabled = false }) => {
  return (
    <button
      onClick={() => !disabled && onChange(!enabled)}
      disabled={disabled}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF3B5C] focus:ring-offset-2
        ${enabled ? 'bg-[#FF3B5C]' : 'bg-gray-200'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform
          ${enabled ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  );
};

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  confirmVariant?: 'danger' | 'primary';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  confirmVariant = 'danger'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        <div className="flex items-center space-x-3 mb-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            confirmVariant === 'danger' ? 'bg-red-100' : 'bg-blue-100'
          }`}>
            <AlertTriangle size={20} className={
              confirmVariant === 'danger' ? 'text-red-600' : 'text-blue-600'
            } />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 font-space-grotesk">
            {title}
          </h3>
        </div>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {message}
        </p>
        
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              confirmVariant === 'danger'
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-[#FF3B5C] text-white hover:bg-[#E63350]'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

const SettingsPage: React.FC = () => {
  const { authState, logout } = useAuth();
  const { connectionState, isDevMode } = useTikTokConnection();
  
  // Settings state
  const [liveAlertsEnabled, setLiveAlertsEnabled] = useState(true);
  const [postStreamSummary, setPostStreamSummary] = useState(true);
  const [alertFrequency, setAlertFrequency] = useState('real-time');
  const [buyerIntentGraph, setBuyerIntentGraph] = useState(true);
  const [keywordRadar, setKeywordRadar] = useState(true);
  const [compactLayout, setCompactLayout] = useState(false);
  
  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  // Loading states
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    // Show success toast or notification
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    // Handle account deletion
    console.log('Account deletion requested');
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    logout();
  };

  const handlePrivacyClick = () => {
    window.location.hash = '#privacy';
    window.location.reload();
  };

  const handleTermsClick = () => {
    window.location.hash = '#terms';
    window.location.reload();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900 font-space-grotesk">
          Settings
        </h1>
        <p className="text-gray-600">
          Manage your TikTok connection, notifications, and dashboard preferences
        </p>
      </div>

      {/* TikTok Connection Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <Settings size={20} className="text-red-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 font-space-grotesk">
              TikTok Connection
            </h2>
            <p className="text-sm text-gray-600">
              Manage your TikTok account connection and handle
            </p>
          </div>
        </div>

        {/* Connection Status */}
        <div className="mb-6">
          <div className={`flex items-center space-x-3 p-4 rounded-lg border ${
            connectionState.isConnected 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            {connectionState.isConnected ? (
              <>
                <CheckCircle size={20} className="text-green-600" />
                <div className="flex-1">
                  <p className="font-medium text-green-900">
                    ✅ Connected to {connectionState.tiktokHandle}
                  </p>
                  <p className="text-sm text-green-700">
                    {isDevMode ? 'Mock connection active for development' : 'Your TikTok account is connected and ready'}
                  </p>
                </div>
              </>
            ) : (
              <>
                <XCircle size={20} className="text-red-600" />
                <div className="flex-1">
                  <p className="font-medium text-red-900">
                    ❌ Not connected to TikTok
                  </p>
                  <p className="text-sm text-red-700">
                    Connect your TikTok account to start analyzing live streams
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* TikTok Connection Card */}
        <TikTokConnectionCard />

        {/* Privacy Notice */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <Shield size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Privacy & Security</p>
              <p>
                We don't store viewer data. This connection is secure and compliant with TikTok's privacy policy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Bell size={20} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 font-space-grotesk">
              Notification Preferences
            </h2>
            <p className="text-sm text-gray-600">
              Control when and how you receive alerts about buyer intent
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Live Buyer Intent Alerts */}
          <div className="flex items-center justify-between">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mt-1">
                <Zap size={16} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Live Buyer Intent Alerts</h3>
                <p className="text-sm text-gray-600">
                  Get real-time notifications when high-intent viewers are detected during your stream
                </p>
              </div>
            </div>
            <Toggle 
              enabled={liveAlertsEnabled} 
              onChange={setLiveAlertsEnabled}
              disabled={!connectionState.isConnected}
            />
          </div>

          {/* Post-Stream Summary */}
          <div className="flex items-center justify-between">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mt-1">
                <BarChart3 size={16} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Post-Stream Summary</h3>
                <p className="text-sm text-gray-600">
                  Receive a detailed report after each stream with buyer signals and insights
                </p>
              </div>
            </div>
            <Toggle 
              enabled={postStreamSummary} 
              onChange={setPostStreamSummary}
            />
          </div>

          {/* Alert Frequency */}
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mt-1">
                <Clock size={16} className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Alert Frequency</h3>
                <p className="text-sm text-gray-600">
                  Choose how often you want to receive live alerts during streaming
                </p>
              </div>
            </div>
            <div className="ml-11">
              <select
                value={alertFrequency}
                onChange={(e) => setAlertFrequency(e.target.value)}
                disabled={!liveAlertsEnabled || !connectionState.isConnected}
                className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF3B5C] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="real-time">Real-time (immediate)</option>
                <option value="5-minutes">Every 5 minutes</option>
                <option value="summary-only">Summary only (post-stream)</option>
              </select>
            </div>
          </div>

          {/* Note about in-app notifications */}
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2">
              <Smartphone size={16} className="text-gray-500" />
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> All notifications are in-app only for MVP. Email and push notifications coming soon.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Customization */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Layout size={20} className="text-purple-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 font-space-grotesk">
              Dashboard Customization
            </h2>
            <p className="text-sm text-gray-600">
              Customize your dashboard layout and visible components
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Buyer Intent Graph */}
          <div className="flex items-center justify-between">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mt-1">
                <BarChart3 size={16} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Enable Buyer Intent Graph</h3>
                <p className="text-sm text-gray-600">
                  Show the real-time buyer intent pulse graph on your dashboard
                </p>
              </div>
            </div>
            <Toggle 
              enabled={buyerIntentGraph} 
              onChange={setBuyerIntentGraph}
            />
          </div>

          {/* Keyword Radar */}
          <div className="flex items-center justify-between">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                <Hash size={16} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Enable Keyword Radar</h3>
                <p className="text-sm text-gray-600">
                  Display trending keywords and product mentions in your streams
                </p>
              </div>
            </div>
            <Toggle 
              enabled={keywordRadar} 
              onChange={setKeywordRadar}
            />
          </div>

          {/* Compact Layout */}
          <div className="flex items-center justify-between">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mt-1">
                <Eye size={16} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Compact Layout Mode</h3>
                <p className="text-sm text-gray-600">
                  Use a more condensed layout to fit more information on screen
                </p>
              </div>
            </div>
            <Toggle 
              enabled={compactLayout} 
              onChange={setCompactLayout}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="px-4 py-2 bg-[#FF3B5C] text-white rounded-lg hover:bg-[#E63350] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save Preferences</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <User size={20} className="text-gray-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 font-space-grotesk">
              Account Settings
            </h2>
            <p className="text-sm text-gray-600">
              Manage your account information and access
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Connected Account Info */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              {authState.user?.avatarUrl && (
                <img 
                  src={authState.user.avatarUrl} 
                  alt={authState.user.displayName}
                  className="w-12 h-12 rounded-lg border border-gray-200"
                />
              )}
              <div>
                <h3 className="font-medium text-gray-900">
                  {authState.user?.displayName}
                </h3>
                <p className="text-sm text-gray-600">
                  {connectionState.tiktokHandle || 'No TikTok handle connected'}
                </p>
                {authState.user?.isDev && (
                  <span className="inline-flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium mt-1">
                    <Zap size={10} />
                    <span>Dev Mode</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <LogOut size={16} />
              <span>Log out / Disconnect</span>
            </button>
            
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center justify-center space-x-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors font-medium"
            >
              <Trash2 size={16} />
              <span>Delete Account</span>
            </button>
          </div>
        </div>
      </div>

      {/* Privacy & Transparency */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Shield size={20} className="text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 font-space-grotesk">
              Privacy & Transparency
            </h2>
            <p className="text-sm text-gray-600">
              Learn about our privacy practices and data handling
            </p>
          </div>
        </div>

        {/* Privacy Statement */}
        <div className="p-4 bg-green-50 rounded-lg border border-green-200 mb-6">
          <p className="text-sm text-green-800 leading-relaxed">
            <strong>GlassConversion is built in full compliance with TikTok's privacy policy.</strong> We never store viewer usernames, IDs, or raw comments. All data is anonymized and only used to support your live selling performance. Comment data is automatically deleted within 48 hours.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handlePrivacyClick}
            className="flex items-center justify-center space-x-2 px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            <Shield size={16} />
            <span>Privacy Policy</span>
            <ExternalLink size={14} />
          </button>
          
          <button
            onClick={handleTermsClick}
            className="flex items-center justify-center space-x-2 px-4 py-2 border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors font-medium"
          >
            <Settings size={16} />
            <span>Terms of Use</span>
            <ExternalLink size={14} />
          </button>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Sparkles size={20} className="text-purple-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 font-space-grotesk">
              What's Coming Next
            </h2>
            <p className="text-sm text-gray-600">
              Exciting features in development
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg border border-white/40">
            <Mail size={16} className="text-purple-600" />
            <span className="text-sm font-medium text-gray-800">Email alerts</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg border border-white/40">
            <Settings size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-gray-800">Shopify integration</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg border border-white/40">
            <Zap size={16} className="text-green-600" />
            <span className="text-sm font-medium text-gray-800">Custom buyer triggers</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg border border-white/40">
            <Hash size={16} className="text-red-600" />
            <span className="text-sm font-medium text-gray-800">Stream keyword tagging</span>
          </div>
        </div>
      </div>

      {/* Confirmation Modals */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data, including stream analytics and settings."
        confirmText="Delete Account"
        confirmVariant="danger"
      />

      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Log Out"
        message="Are you sure you want to log out? You'll need to reconnect your TikTok account when you return."
        confirmText="Log Out"
        confirmVariant="primary"
      />
    </div>
  );
};

export default SettingsPage;