// src/contexts/Theme.context.jsx
import {createContext,useState,useCallback,useMemo} from 'react';

export const themes = {
  dark: "dark",
  light: "light"
}

export const ThemeContext = createContext();

export const ThemeProvider = ({
  children
}) => {
  const [theme, setTheme] = useState(sessionStorage.getItem('themeMode') || themes.dark);

  const toggleTheme = useCallback(() => {
    const newThemeValue = theme === themes.dark ? themes.light : themes.dark;
    setTheme(newThemeValue);
    sessionStorage.setItem('themeMode', newThemeValue);
  }, [theme]);

  const oppositeTheme = useMemo(() => theme === themes.dark ? themes.light : themes.dark, [theme]);

  const value = useMemo(()=> ({ theme, oppositeTheme, toggleTheme }), [theme, oppositeTheme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
