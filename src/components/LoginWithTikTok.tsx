import React, { useEffect, useState } from 'react';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { User } from '../types/auth';

const LoginWithTikTok: React.FC = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TikTok OAuth configuration
  const TIKTOK_CLIENT_ID = import.meta.env.VITE_TIKTOK_CLIENT_ID || 'your_tiktok_client_id';
  const TIKTOK_REDIRECT_URI = import.meta.env.VITE_TIKTOK_REDIRECT_URI || `${window.location.origin}/auth/callback`;
  const TIKTOK_SCOPE = 'user.info.basic';

  useEffect(() => {
    // Handle OAuth callback
    const handleOAuthCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const error = urlParams.get('error');

      if (error) {
        setError('TikTok authentication was cancelled or failed.');
        return;
      }

      if (code) {
        setIsLoading(true);
        try {
          // Exchange code for access token
          const response = await fetch('/api/tiktok/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          });

          if (!response.ok) {
            throw new Error('Failed to authenticate with TikTok');
          }

          const userData = await response.json();
          
          const user: User = {
            id: userData.open_id,
            displayName: userData.display_name,
            avatarUrl: userData.avatar_url,
            tiktokHandle: userData.username || `@${userData.display_name.toLowerCase().replace(/\s+/g, '')}`,
          };

          login(user);
          
          // Redirect to dashboard
          window.location.hash = '#dashboard';
          window.location.reload();
        } catch (err) {
          console.error('TikTok auth error:', err);
          setError('Failed to complete TikTok authentication. Please try again.');
        } finally {
          setIsLoading(false);
        }
      }
    };

    handleOAuthCallback();
  }, [login]);

  const handleTikTokLogin = () => {
    const authUrl = new URL('https://www.tiktok.com/auth/authorize/');
    authUrl.searchParams.append('client_key', TIKTOK_CLIENT_ID);
    authUrl.searchParams.append('scope', TIKTOK_SCOPE);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('redirect_uri', TIKTOK_REDIRECT_URI);
    authUrl.searchParams.append('state', 'random_state_string'); // Add CSRF protection in production

    window.location.href = authUrl.toString();
  };

  const handleBackToHome = () => {
    window.location.hash = '';
    window.location.reload();
  };

  // DEV ONLY – REMOVE BEFORE PRODUCTION
  const handleDevBypass = () => {
    const devUser: User = {
      id: 'dev_user_001',
      displayName: 'Dev Mode Creator',
      avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      tiktokHandle: '@devmode',
      isDev: true,
    };
    
    login(devUser);
    window.location.hash = '#dashboard';
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-[#FF3B5C] rounded-lg flex items-center justify-center">
              <div className="w-5 h-5 bg-white rounded-sm"></div>
            </div>
            <span className="text-2xl font-bold text-gray-900 font-space-grotesk">
              GlassConversion
            </span>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 font-space-grotesk">
            Connect with TikTok
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Analyze your TikTok Live streams for buying signals.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* TikTok Login */}
        <div className="space-y-6">
          <button
            onClick={handleTikTokLogin}
            disabled={isLoading}
            className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-lg font-semibold rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Connecting...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-4 h-4 bg-black rounded-sm"></div>
                </div>
                <span>Continue with TikTok</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            )}
          </button>

          <div className="text-center">
            <button
              onClick={handleBackToHome}
              className="text-gray-600 hover:text-gray-900 transition-colors underline underline-offset-4"
            >
              Back to home
            </button>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Privacy-first authentication</p>
            <p>We only access basic profile info needed for your dashboard. No personal data from your viewers is ever stored.</p>
          </div>
        </div>

        {/* DEV ONLY – REMOVE BEFORE PRODUCTION */}
        {import.meta.env.DEV && (
          <div className="border-t border-gray-200 pt-6">
            <button
              onClick={handleDevBypass}
              className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Developer Bypass (Dev Mode Only)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginWithTikTok;