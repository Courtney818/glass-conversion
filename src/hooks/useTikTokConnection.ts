import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { createClient } from '@supabase/supabase-js';

export interface TikTokConnectionState {
  isConnected: boolean;
  tiktokHandle: string | null;
  isLoading: boolean;
  error: string | null;
}

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

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

  const updateUserTikTokHandle = async (newHandle: string): Promise<void> => {
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }

    if (!authState.user) {
      throw new Error('User not authenticated');
    }

    // Get current session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('No active session');
    }

    // Call the Edge Function to update the user profile
    const response = await fetch(`${supabaseUrl}/functions/v1/update-user-profile`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        custom_tiktok_handle: newHandle,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update TikTok handle');
    }

    const { user: updatedUserData } = await response.json();

    // Update the local auth state with the new handle
    const updatedUser = {
      ...authState.user,
      tiktokHandle: updatedUserData.custom_tiktok_handle,
    };

    login(updatedUser);
  };

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

  const updateTikTokHandle = async (newHandle: string) => {
    if (!newHandle.trim()) {
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
      // Format handle (ensure it starts with @)
      const formattedHandle = newHandle.startsWith('@') ? newHandle : `@${newHandle}`;

      // Basic validation
      const cleanHandle = formattedHandle.slice(1);
      if (cleanHandle.length < 2 || !/^[a-zA-Z0-9._]+$/.test(cleanHandle)) {
        throw new Error('Invalid username format. Use letters, numbers, dots, and underscores only.');
      }

      // Check if we're in dev mode
      const isDevMode = import.meta.env.VITE_DEV_BYPASS === 'true' && import.meta.env.DEV;
      
      if (isDevMode || authState.user?.isDev) {
        // Use dev mode logic
        await connectDevHandle(newHandle);
      } else {
        // Use production logic with Supabase
        await updateUserTikTokHandle(formattedHandle);
        
        setConnectionState({
          isConnected: true,
          tiktokHandle: formattedHandle,
          isLoading: false,
          error: null,
        });
      }
    } catch (error) {
      setConnectionState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to update handle',
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
    updateTikTokHandle,
    connectRealTikTok,
    disconnect,
    isDevMode: import.meta.env.VITE_DEV_BYPASS === 'true' && import.meta.env.DEV,
  };
};