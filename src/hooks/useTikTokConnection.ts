import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export interface TikTokConnectionState {
  isConnected: boolean;
  tiktokHandle: string | null;
  isLoading: boolean;
  error: string | null;
}

export const useTikTokConnection = () => {
  const { authState, login } = useAuth();
  const [connectionState, setConnectionState] = useState<TikTokConnectionState>({
    isConnected: false,
    tiktokHandle: null,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    // Initialize connection state based on current user
    if (authState.user?.tiktokHandle) {
      setConnectionState({
        isConnected: true,
        tiktokHandle: authState.user.tiktokHandle,
        isLoading: false,
        error: null,
      });
    } else {
      setConnectionState({
        isConnected: false,
        tiktokHandle: null,
        isLoading: false,
        error: null,
      });
    }
  }, [authState.user]);

  const connectDevHandle = async (handle: string) => {
    if (!handle.trim()) {
      setConnectionState(prev => ({
        ...prev,
        error: 'Please enter a TikTok handle',
      }));
      return;
    }

    setConnectionState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Format handle (ensure it starts with @)
      const formattedHandle = handle.startsWith('@') ? handle : `@${handle}`;

      // Basic validation
      const cleanHandle = formattedHandle.slice(1);
      if (cleanHandle.length < 2 || !/^[a-zA-Z0-9._]+$/.test(cleanHandle)) {
        throw new Error('Invalid username format. Use letters, numbers, dots, and underscores only.');
      }

      // Update user with TikTok handle
      const updatedUser = {
        ...authState.user!,
        tiktokHandle: formattedHandle,
      };

      login(updatedUser);

      setConnectionState({
        isConnected: true,
        tiktokHandle: formattedHandle,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setConnectionState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to connect handle',
      }));
    }
  };

  const connectRealTikTok = async () => {
    setConnectionState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      // In a real implementation, this would trigger TikTok re-authentication
      // or fetch the handle from the existing session
      
      // For now, simulate the process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This would normally come from TikTok API
      const mockHandle = '@' + authState.user?.displayName?.toLowerCase().replace(/\s+/g, '') || '@creator';
      
      const updatedUser = {
        ...authState.user!,
        tiktokHandle: mockHandle,
      };

      login(updatedUser);

      setConnectionState({
        isConnected: true,
        tiktokHandle: mockHandle,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setConnectionState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to connect TikTok handle. Please try again.',
      }));
    }
  };

  const disconnect = () => {
    const updatedUser = {
      ...authState.user!,
      tiktokHandle: undefined,
    };

    login(updatedUser);

    setConnectionState({
      isConnected: false,
      tiktokHandle: null,
      isLoading: false,
      error: null,
    });
  };

  return {
    connectionState,
    connectDevHandle,
    connectRealTikTok,
    disconnect,
    isDevMode: import.meta.env.VITE_DEV_BYPASS === 'true' && import.meta.env.DEV,
  };
};