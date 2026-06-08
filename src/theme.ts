import { createTheme } from '@mui/material/styles';

export const cardAccentColors = ['#3a6b8c', '#5e8c6a', '#8c6a4e', '#6a5e8c', '#8c4e5e', '#4e8c8c'];

const sharedComponents = {
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        transition:
          'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 16,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 10,
        textTransform: 'none',
        fontWeight: 600,
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },
};

const sharedTypography = {
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  h1: { fontFamily: '"Playfair Display", serif', fontWeight: 700 },
  h2: { fontFamily: '"Playfair Display", serif', fontWeight: 700 },
  h3: { fontFamily: '"Playfair Display", serif', fontWeight: 600 },
  h4: { fontFamily: '"Playfair Display", serif', fontWeight: 600 },
  h5: { fontFamily: '"Playfair Display", serif', fontWeight: 500 },
  h6: { fontFamily: '"Playfair Display", serif', fontWeight: 500 },
};

export function getLightTheme() {
  return createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#2d5a7b' },
      secondary: { main: '#c1783a' },
      background: {
        default: '#fafaf9',
        paper: '#ffffff',
      },
      text: {
        primary: '#1c1c1c',
        secondary: '#5c5c5c',
      },
      divider: '#e8e8e8',
    },
    typography: sharedTypography,
    shape: { borderRadius: 12 },
    components: {
      ...sharedComponents,
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
            transition:
              'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        },
      },
    },
  });
}

export function getDarkTheme() {
  return createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#6ba5cc' },
      secondary: { main: '#d4945e' },
      background: {
        default: '#111110',
        paper: '#1c1c1b',
      },
      text: {
        primary: '#e8e8e6',
        secondary: '#a0a09e',
      },
      divider: '#2a2a28',
    },
    typography: sharedTypography,
    shape: { borderRadius: 12 },
    components: {
      ...sharedComponents,
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: '0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.15)',
            transition:
              'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        },
      },
    },
  });
}
