import { createMuiTheme } from '@material-ui/core';
import { grey, orange, red } from '@material-ui/core/colors';

const theme = createMuiTheme();

export const customTheme = createMuiTheme({
  palette: {
    primary: orange,
  },
  typography: {
    h2: {
      fontSize: 18,
      fontWeight: 500,
    },
    h6: {
      fontSize: 15,
      fontWeight: 500,
    },
  },
  overrides: {
    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: 'transparent',
        },
      },
      icon: {
        right: theme.spacing(1.5),
      },
    },
    MuiInput: {
      root: {
        '&:hover': {
          backgroundColor: theme.palette.action.selected,
        },
        backgroundColor: grey[300],
        borderRadius: theme.spacing(1),
        padding: `0 ${theme.spacing(1.5)}px`,
      },
      input: {
        padding: `${theme.spacing(1.5)}px 0`,
      },
      underline: {
        '&:before': {
          borderBottom: 'none',
        },
        '&:after': {
          borderBottom: 'none',
        },
        '&:hover': {
          borderBottom: 'none',
        },
        '&:hover&:before': {
          borderBottom: 'none',
        },
      },
    },
  },
});
