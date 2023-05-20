import { create } from 'zustand';
import { persist } from 'zustand/middleware'

interface DarkModeStore {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  toggleDarkMode: () => void;
}

export const useDarkMode = create<DarkModeStore>()(
  persist(
    (set) => ({
      darkMode: false,
      setDarkMode: (value: boolean) => set(() => ({ darkMode: value })),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'theme', 
    }
  )
)

