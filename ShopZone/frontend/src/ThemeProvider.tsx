import React from "react";
import { useDarkMode } from "./store/theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {

  const { darkMode } = useDarkMode();

  return (
    <div className={darkMode ? "dark" : ""}>
      {children}
    </div>
  );
};
