import { AlertColor } from '@mui/material';
import { Snackbar } from 'knitting/dumbs';
import React from 'react';
import { atom, useRecoilValue } from 'recoil';

export type SnackbarParams = {
  message: string;
  severity: AlertColor;
  callbackAfterReset?(): void;
};

export const snackbarAtom = atom<SnackbarParams | undefined>({
  key: 'snackbar',
  default: undefined,
});

const CommonSnackbar = (): React.ReactElement | null => {
  const { message, severity } = useRecoilValue(snackbarAtom) ?? {};

  if (message == null) {
    return null;
  }

  return (
    <Snackbar label={message} open={true} severity={severity ?? 'error'} />
  );
};

export default CommonSnackbar;
