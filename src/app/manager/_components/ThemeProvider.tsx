"use client";

import { ReactNode, createContext, useContext } from "react";

interface ThemeContextType {
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType>({ isDarkMode: false });

export function ThemeProvider({ children, isDarkMode }: { children: ReactNode; isDarkMode: boolean }) {
  return <ThemeContext.Provider value={{ isDarkMode }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

