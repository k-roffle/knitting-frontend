import { createMuiTheme } from '@material-ui/core';

import { palette } from './palatte';

export const defaultTheme = createMuiTheme();

export const { overrides } = createMuiTheme({
  overrides: {
    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: 'transparent',
        },
      },
      icon: {
        right: defaultTheme.spacing(1.5),
      },
    },
    MuiInput: {
      root: {
        border: '2px solid transparent',
        backgroundColor: palette.grey[200],
        borderRadius: defaultTheme.spacing(1),
        padding: `0 ${defaultTheme.spacing(1.5)}px`,
        '&.Mui-focused': {
          border: `2px solid ${palette.primary.light}`,
        },
        '&:hover:not($disabled):not($focused):not($error)': {
          backgroundColor: palette.action.hover,
        },
      },
      input: {
        padding: `${defaultTheme.spacing(1.5)}px 0`,
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
    MuiStepConnector: {
      alternativeLabel: {
        top: 10,
        left: 'calc(-50%)',
        right: 'calc(50%)',
      },
      active: {
        '& $line': {
          borderColor: palette.primary.main,
        },
      },
      completed: {
        '& $line': {
          borderColor: palette.primary.main,
        },
      },
      line: {
        borderColor: palette.grey[200],
      },
      lineHorizontal: {
        borderTopWidth: 5,
      },
    },
  },
});
