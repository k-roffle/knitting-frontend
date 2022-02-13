import { useCommonSnackbar } from 'knitting/components/CommonSnackbar/useCommonSnackbar';
import { GENERAL_ERROR } from 'knitting/constants/errors';
import { RequestParam } from 'knitting/utils/requestType';
import { getRequest } from 'knitting/utils/requests';
import { UseQueryResult } from 'react-query/types/react/types';

import { useState } from 'react';
import { useQuery } from 'react-query';

export const useGet = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
>({
  pathname,
  errorMessage = GENERAL_ERROR,
  onSuccess,
}: RequestParam): UseQueryResult<TData, TError> => {
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
