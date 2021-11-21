import { createMuiTheme } from '@mui/material';

export const { typography } = createMuiTheme({
  typography: {
    h1: {
      fontSize: 42,
      fontWeight: 300,
      lineHeight: '50px',
    },
    h2: {
      fontSize: 32,
      fontWeight: 400,
      lineHeight: '40px',
    },
    h3: {
      fontSize: 28,
      fontWeight: 400,
      lineHeight: '36px',
    },
    h4: {
      fontSize: 20,
      fontWeight: 400,
      lineHeight: '28px',
    },
    h5: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: '22px',
    },
    h6: {
      fontSize: 14,
      fontWeight: 600,
      lineHeight: '18px',
    },
  },
});
