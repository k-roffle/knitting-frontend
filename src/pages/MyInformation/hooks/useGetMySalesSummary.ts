import useSWR, { SWRResponse } from 'swr';
import { getAccessToken } from 'utils/auth';
import { SingleResponse } from 'utils/requestType';
import { request } from 'utils/requests';

import { SalesSummaryResponse } from './types';

type MySalesSummaryQueryResult = SingleResponse<SalesSummaryResponse>;

const getMySalesSummary = async (
  pathname: string,
): Promise<MySalesSummaryQueryResult> => {
  const { data } = await request({
    pathname,
    method: 'get',
    accessToken: getAccessToken(),
  });

  return data;
};

export const useGetMySalesSummary = (): SWRResponse<
  MySalesSummaryQueryResult,
  MySalesSummaryQueryResult
> => {
  const response = useSWR('/me/sales-summary', getMySalesSummary);

  return response;
};
