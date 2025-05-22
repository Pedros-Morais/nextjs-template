'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createSelectors } from './zustandUtils';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const useThemeStoreBase = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      
      setTheme: (theme: Theme) => set({ theme }),
      toggleTheme: () => 
        set((state) => ({ 
          theme: state.theme === 'light' 
            ? 'dark' 
            : state.theme === 'dark' 
              ? 'system' 
              : 'light' 
        })),
    }),
    { 
      name: 'theme-storage', 
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);

export const useThemeStore = createSelectors(useThemeStoreBase);
