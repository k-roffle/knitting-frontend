import { createMuiTheme } from '@material-ui/core';

export const { zIndex } = createMuiTheme({
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
});
