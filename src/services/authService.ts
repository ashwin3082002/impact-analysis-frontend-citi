import { API_ENDPOINTS } from '@/config/api';
import { apiClient } from './apiClient';
import { User } from '@/types';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

interface MeResponse {
  user: User;
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH_LOGIN,
      { email, password } as LoginRequest,
      false // Don't include auth header for login
    );
    
    // Store the JWT token
    if (response.token) {
      apiClient.setToken(response.token);
    }
    
    return response;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH_LOGOUT);
    } finally {
      // Clear token even if API call fails
      apiClient.clearToken();
    }
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<MeResponse>(API_ENDPOINTS.AUTH_ME);
    return response.user;
  },
};
