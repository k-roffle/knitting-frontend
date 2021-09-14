import useSWR, { SWRResponse } from 'swr';
import { getAccessToken } from 'utils/auth';
import { SingleResponse } from 'utils/requestType';
import { request } from 'utils/requests';

import { SalesSummeryResponse } from './types';

type VendorQueryResult = SingleResponse<SalesSummeryResponse>;

const getMySalesSummary = async (
  pathname: string,
): Promise<VendorQueryResult> => {
  const { data } = await request({
    pathname,
    method: 'get',
    accessToken: getAccessToken(),
  });

  return data;
};

export const useGetMySalesSummary = (): SWRResponse<
  VendorQueryResult,
  SingleResponse<SalesSummeryResponse>
> => {
  const response = useSWR('/me/sales-summary', getMySalesSummary);

  return response;
};
