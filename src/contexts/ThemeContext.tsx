import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme') as Theme;
    console.log('Initial theme from localStorage:', stored);
    return stored || 'system';
  });

  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const root = window.document.documentElement;
    
    const updateTheme = () => {
      let resolvedTheme: 'light' | 'dark';
      
      if (theme === 'system') {
        resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        resolvedTheme = theme;
      }
      
      setActualTheme(resolvedTheme);
      root.classList.remove('light', 'dark');
      root.classList.add(resolvedTheme);
      console.log('Theme updated:', theme, 'Resolved theme:', resolvedTheme, 'HTML classList:', root.classList.value);
    };

    updateTheme();
    localStorage.setItem('theme', theme);
    console.log('Saved theme to localStorage:', theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', updateTheme);
      console.log('System theme listener added.');
      return () => {
        mediaQuery.removeEventListener('change', updateTheme);
        console.log('System theme listener removed.');
      };
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, actualTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}