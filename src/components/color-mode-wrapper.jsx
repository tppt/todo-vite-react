import { createContext, useMemo, useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function ColorModeWrapper({ children }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const myThemeMode = localStorage.getItem("themeMode");
  const [themeMode, setThemeMode] = useState(myThemeMode || (prefersDarkMode ? 'dark' : 'light'));
  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  }), []);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode],
  );

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);
  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}