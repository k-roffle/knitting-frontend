import useSWR, { SWRResponse } from 'swr';
import { getAccessToken } from 'utils/auth';
import { DEFAULT_LIST_LENGTH, ListResponse } from 'utils/requestType';
import { request } from 'utils/requests';

import { DesignItemResponse } from './types';

type VendorQueryResult = ListResponse<DesignItemResponse>;

const getMyDesigns = async (pathname: string): Promise<VendorQueryResult> => {
  const { data } = await request({
    pathname,
    method: 'get',
    params: {
      count: DEFAULT_LIST_LENGTH,
    },
    accessToken: getAccessToken(),
  });

  const { data: payload, meta } = data;

  return { payload, meta };
};

export const useGetMyDesigns = (): SWRResponse<VendorQueryResult, unknown> => {
  const response = useSWR('designs/my', (pathname) => getMyDesigns(pathname));

  return response;
};
