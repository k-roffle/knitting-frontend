import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { snackbarAtom, SnackbarParams } from '.';

const SNACKBAR_DURATION_TIME = 2000;

interface Props {
  dependencies: unknown[];
}

export const useCommonSnackbar = ({
  message,
  severity,
  dependencies,
  callbackAfterReset,
}: Props & SnackbarParams): void => {
  const setErrorSnackbarMessage = useSetRecoilState(snackbarAtom);

  useEffect(() => {
    if (dependencies.every((dependency) => dependency)) {
      setErrorSnackbarMessage({ message, severity });

      setTimeout(() => {
        setErrorSnackbarMessage(undefined);
        callbackAfterReset?.();
      }, SNACKBAR_DURATION_TIME);
    }
  }, dependencies);
};
