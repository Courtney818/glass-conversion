import { useState, useEffect, createContext, useContext } from 'react';
import { User, AuthState } from '../types/auth';

const AuthContext = createContext<{
  authState: AuthState;
  login: (user: User) => void;
  logout: () => void;
  initializeAuth: () => void;
} | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthState = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const login = (user: User) => {
    setAuthState({
      user,
      isLoading: false,
      isAuthenticated: true,
    });
    // Store user in sessionStorage for persistence
    sessionStorage.setItem('glassconversion_user', JSON.stringify(user));
  };

  const logout = () => {
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
    sessionStorage.removeItem('glassconversion_user');
    // Redirect to home
    window.location.hash = '';
    window.location.reload();
  };

  const initializeAuth = () => {
    // Check for existing session
    const storedUser = sessionStorage.getItem('glassconversion_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true,
        });
        return;
      } catch (error) {
        console.error('Error parsing stored user:', error);
        sessionStorage.removeItem('glassconversion_user');
      }
    }

    // Check for dev bypass
    const isDevMode = import.meta.env.VITE_DEV_BYPASS === 'true';
    if (isDevMode && import.meta.env.DEV) {
      const devUser: User = {
        id: 'dev_user_001',
        displayName: 'Dev Mode Creator',
        avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        tiktokHandle: '@devmode',
        isDev: true,
      };
      
      login(devUser);
      return;
    }

    // No session found
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return {
    authState,
    login,
    logout,
    initializeAuth,
  };
};

export { AuthContext };