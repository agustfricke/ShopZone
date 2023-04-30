import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  access: string;
  refresh: string;
  isAuth: boolean;
};

type Actions = {
  setToken: (access: string, refresh: string) => void;
  logout: () => void;
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      // ?????
      access: null,
      refresh: null,
      isAuth: false,
      setToken: (access: string, refresh: string) =>
        set(() => ({
          access,
          refresh,
          isAuth: !!access && !!refresh,
        })),
      logout: () => set(() => ({ access: null,refresh: null, isAuth: false })),
    }),
    {
      name: "auth",
    }
  )
);
