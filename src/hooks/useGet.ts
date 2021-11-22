import { GENERAL_ERROR } from 'constants/errors';

import { useCommonSnackbar } from 'components/CommonSnackbar/useCommonSnackbar';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { RequestParam } from 'utils/requestType';
import { getRequest } from 'utils/requests';

export const useGet = ({
  pathname,
  errorMessage = GENERAL_ERROR,
  onSuccess,
}: RequestParam) => {
  const [showError, setShowError] = useState<boolean>(false);

  useCommonSnackbar({
    message: errorMessage,
    severity: 'error',
    dependencies: [showError],
  });

  return useQuery(pathname, () => getRequest(pathname), {
    onSuccess,
    onError: () => setShowError(true),
  });
};
