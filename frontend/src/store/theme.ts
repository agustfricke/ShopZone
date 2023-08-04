import { create } from 'zustand';
import { persist } from 'zustand/middleware'

interface DarkModeStore {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const useDarkMode = create<DarkModeStore>()(
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'theme', 
    }
  )
)
