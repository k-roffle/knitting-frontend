import { createMuiTheme } from '@material-ui/core';

export const { palette } = createMuiTheme({
  palette: {
    primary: {
      light: '#ff8a65',
      main: '#f24726',
    },
    action: {
      hover: 'rgba(0, 0, 0, 0.06)',
    },
    grey: {
      200: '#f4f4f4',
    },
  },
});
