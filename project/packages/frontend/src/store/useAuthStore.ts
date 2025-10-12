import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { AuthState } from './AuthState';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      shouldRedirect: false,
      login: (user, token) => set({ user, token, shouldRedirect: false }),
      logout: () => set({ user: null, token: null, shouldRedirect: true }),
      resetRedirect: () => set({ shouldRedirect: false }),
    }),
    { name: 'auth-storage' }
  )
);
