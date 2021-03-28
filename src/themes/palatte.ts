import { createMuiTheme } from '@material-ui/core';

import { deepOrange } from './colors/deepOrange';

export const { palette } = createMuiTheme({
  palette: {
    primary: {
      light: deepOrange[200],
      main: deepOrange[600],
      dark: deepOrange[800],
    },
    action: {
      hover: 'rgba(0, 0, 0, 0.06)',
    },
    grey: {
      200: '#f4f4f4',
    },
  },
});
