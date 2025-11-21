import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';
import { validateCredentials, simulateApiDelay } from '@/data/dummyData';
import { authService } from '@/services/authService';
import { API_CONFIG } from '@/config/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          if (API_CONFIG.USE_REAL_API) {
            // Use real API
            const response = await authService.login(email, password);
            set({ user: response.user, isAuthenticated: true, isLoading: false });
            return true;
          } else {
            // Use dummy data
            await simulateApiDelay(800);
            const user = validateCredentials(email, password);
            
            if (user) {
              set({ user, isAuthenticated: true, isLoading: false });
              return true;
            } else {
              set({ 
                error: 'Invalid email or password', 
                isLoading: false,
                isAuthenticated: false,
                user: null
              });
              return false;
            }
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Invalid email or password';
          set({ 
            error: errorMessage, 
            isLoading: false,
            isAuthenticated: false,
            user: null
          });
          return false;
        }
      },

      logout: async () => {
        if (API_CONFIG.USE_REAL_API) {
          try {
            await authService.logout();
          } catch (error) {
            console.error('Logout error:', error);
          }
        }
        set({ user: null, isAuthenticated: false, error: null });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
