import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

import { palette } from './palette';

export const defaultTheme = createTheme();

export const { components } = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow:
            '0px 2px 4px -1px rgb(0 0 0 / 3%), 0px 4px 5px 0px rgb(0 0 0 / 3%), 0px 1px 10px 0px rgb(0 0 0 / 3%)',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          '&:focus': {
            backgroundColor: 'transparent',
          },
        },
        icon: {
          right: defaultTheme.spacing(1.5),
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          border: '1.5px solid transparent',
          backgroundColor: palette.grey[200],
          borderRadius: defaultTheme.spacing(1),
          padding: defaultTheme.spacing(0, 1.5),
          '&.Mui-focused': {
            border: `1.5px solid ${grey[400]}`,
          },
          '&:hover:not($disabled):not($focused):not($error)': {
            backgroundColor: palette.action.hover,
          },
        },
        input: {
          padding: defaultTheme.spacing(1.5, 0),
        },
        underline: {
          '&:before': {
            borderBottom: 'none',
          },
          '&:after': {
            borderBottom: 'none',
          },
          '&:hover&:before': {
            borderBottom: 'none',
          },
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        root: {
          '&.Mui-active': {
            '& $line': {
              borderColor: palette.primary.main,
            },
          },
          '&.Mui-completed': {
            '& $line': {
              borderColor: palette.primary.main,
            },
          },
        },
        alternativeLabel: {
          top: 10,
          left: 'calc(-50%)',
          right: 'calc(50%)',
        },
        line: {
          borderColor: palette.grey[200],
        },
        lineHorizontal: {
          borderTopWidth: 5,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: palette.text.primary,
          backgroundColor: palette.background.paper,
          fontSize: 12,
          boxShadow: defaultTheme.shadows[2],
          display: 'table',
        },
        arrow: {
          color: palette.background.paper,
          '&:before': {
            boxShadow: defaultTheme.shadows[2],
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        wrapped: {
          fontSize: 15,
        },
      },
    },
  },
});
