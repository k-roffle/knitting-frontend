import { blue } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

import { deepOrange } from './colors/deepOrange';

export const { palette } = createTheme({
  palette: {
    primary: {
      light: deepOrange[200],
      main: deepOrange[600],
      dark: deepOrange[800],
    },
    secondary: {
      light: blue[200],
      main: blue[600],
      dark: blue[800],
    },
    action: {
      hover: 'rgba(0, 0, 0, 0.06)',
    },
    grey: {
      200: '#f4f4f4',
    },
  },
});
