import { Alert, AlertColor, Snackbar as MaterialSnackbar } from '@mui/material';
import React from 'react';

interface Props {
  autoHideDuration?: number;
  label: string;
  onClose?(): void;
  open: boolean;
  severity: AlertColor;
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
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
    >
      <Alert
        elevation={6}
        variant="filled"
        severity={severity}
        onClose={onClose}
      >
        {label}
      </Alert>
    </MaterialSnackbar>
  );
};

export default Snackbar;
