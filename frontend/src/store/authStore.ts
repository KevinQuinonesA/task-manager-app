import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (response: LoginResponse) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

interface LoginResponse {
  message: string;
  user_id: string;
  token: string;
  name: string;
  email: string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      // Updated login to take the backend response object
      login: (response: LoginResponse) => set({ 
        user: {
          id: response.user_id,
          name: response.name,
          email: response.email
        }, 
        token: response.token, 
        isAuthenticated: true 
      }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      updateUser: (userData) => 
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
);