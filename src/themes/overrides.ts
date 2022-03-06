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
          border: '1.5px solid transparent',
          backgroundColor: palette.grey[200],
          borderRadius: defaultTheme.spacing(1),
          padding: defaultTheme.spacing(1, 0),
          '&.Mui-selected': {
            backgroundColor: palette.action.hover,
          },
          '&:hover:not($disabled):not($focused):not($error)': {
            backgroundColor: palette.action.hover,
          },
        },
        icon: {
          right: defaultTheme.spacing(1.5),
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: palette.action.selected,
            '&:hover': {
              backgroundColor: palette.action.hover,
            },
          },
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
          '&.Mui-error': {
            border: `1.5px solid ${palette.error.main}`,
          },
          '&:hover:not($disabled):not($focused):not($error)': {
            backgroundColor: palette.action.hover,
          },
        },
        input: {
          padding: defaultTheme.spacing(1.2, 0),
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
            span: {
              borderColor: palette.primary.main,
            },
          },
          '&.Mui-completed': {
            span: {
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
