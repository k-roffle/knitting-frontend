import { createMuiTheme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

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
    MuiTooltip: {
      tooltip: {
        color: palette.text.primary,
        backgroundColor: palette.background.paper,
        fontSize: 12,
        boxShadow: defaultTheme.shadows[2],
      },
      arrow: {
        color: palette.background.paper,
        '&:before': {
          boxShadow: defaultTheme.shadows[2],
        },
      },
    },
  },
});
