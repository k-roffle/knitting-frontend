import { ObjectResponse } from 'knitting/utils/requestType';
import { getRequest } from 'knitting/utils/requests';
import { UseQueryResult } from 'react-query/types/react/types';

import { useQuery } from 'react-query';

import { SalesSummaryResponse } from './types';

const fetchMySalesSummary = () => {
  return getRequest('/me/sales-summary');
};

export const useGetMySalesSummary = (): UseQueryResult<
  ObjectResponse<SalesSummaryResponse>
> => {
  return useQuery('salesSummary', fetchMySalesSummary);
};
