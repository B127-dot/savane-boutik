import React, { createContext, useContext, useMemo } from 'react';
import { getTheme, Theme } from '@/types/themes';

interface ThemeContextType {
  theme: Theme;
  themeId: string;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  themeId: string;
  children: React.ReactNode;
}

export const ThemeProvider = ({ themeId, children }: ThemeProviderProps) => {
  const theme = useMemo(() => getTheme(themeId), [themeId]);

  return (
    <ThemeContext.Provider value={{ theme, themeId }}>
      {children}
    </ThemeContext.Provider>
  );
};
