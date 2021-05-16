import { Snackbar as MaterialSnackbar } from '@material-ui/core';
import MuiAlert, { Color } from '@material-ui/lab/Alert';
import React from 'react';

interface Props {
  autoHideDuration?: number;
  label: string;
  onClose?(): void;
  open: boolean;
  severity: Color;
}

const Snackbar = ({
  autoHideDuration = 2000,
  label,
  onClose,
  open,
  severity,
}: Props): React.ReactElement => {
  return (
    <MaterialSnackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        severity={severity}
        onClose={onClose}
      >
        {label}
      </MuiAlert>
    </MaterialSnackbar>
  );
};

export default Snackbar;
