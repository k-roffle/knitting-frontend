import { useQuery } from 'react-query';
import { UseQueryResult } from 'react-query/types/react/types';
import { ObjectResponse } from 'utils/requestType';
import { getRequest } from 'utils/requests';

import { SalesSummaryResponse } from './types';

const fetchMySalesSummary = () => {
  return getRequest('/me/sales-summary');
};

export const useGetMySalesSummary = (): UseQueryResult<
  ObjectResponse<SalesSummaryResponse>
> => {
  return useQuery('salesSummary', fetchMySalesSummary);
};
