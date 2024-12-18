import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import palette from './config/palette';
import { createContext, useContext } from 'react';
import { useState } from 'react';
import typography from './config/typography';
import overrideStyle from './config/overrides';

const ThemeContext = createContext();

export default function MUIThemeProvider({ children }) {
  const [mode, setMode] = useState('light');

  let theme = createTheme({
    palette: {
      mode,
    },
  });

  // set palette:
  theme = createTheme(theme, {
    palette: palette(theme),
  });

  // set other style that extends the custom palette:
  theme = createTheme(theme, {
    typography: typography(),
    components: overrideStyle(theme),
  });

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = () => {
  return useContext(ThemeContext);
};
