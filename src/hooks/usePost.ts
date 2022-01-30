import { GENERAL_ERROR, NETWORK_ERROR } from 'constants/errors';

import { useCommonSnackbar } from 'components/CommonSnackbar/useCommonSnackbar';
import { useState } from 'react';
import { useMutation, UseMutationResult } from 'react-query';
import { RequestParam } from 'utils/requestType';
import { postRequest } from 'utils/requests';

export const usePost = ({
  pathname,
  errorMessage = GENERAL_ERROR,
  onSuccess,
  onError,
}: RequestParam): UseMutationResult<void, unknown> => {
  const [postErrorMessage, setPostErrorMessage] = useState<string>();

  useCommonSnackbar({
    message: postErrorMessage ?? errorMessage,
    severity: 'error',
    dependencies: [postErrorMessage],
  });

  const handleError = (error: { response: unknown }) => {
    const isNetworkError = error.response == null;
    const message = isNetworkError ? NETWORK_ERROR : errorMessage;

    onError?.();
    setPostErrorMessage(message);
  };

  return useMutation(pathname, (postData) => postRequest(pathname, postData), {
    onSuccess: () => onSuccess?.(),
    onError: handleError,
  });
};
