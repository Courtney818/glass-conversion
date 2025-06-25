export interface User {
  id: string;
  displayName: string;
  avatarUrl?: string;
  tiktokHandle?: string;
  isDev?: boolean;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface TikTokAuthResponse {
  access_token: string;
  open_id: string;
  scope: string;
  expires_in: number;
}

export interface TikTokUserInfo {
  open_id: string;
  union_id: string;
  avatar_url: string;
  avatar_url_100: string;
  avatar_large_url: string;
  display_name: string;
}