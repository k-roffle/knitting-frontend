import useSWR, { SWRResponse } from 'swr';

import { getAccessToken } from '../../../utils/auth';
import { SingleResponse } from '../../../utils/requestType';
import { request } from '../../../utils/requests';

import { ProfileResponse } from './types';

type VendorQueryResult = SingleResponse<ProfileResponse>;

const getMyProfile = async (pathname: string): Promise<VendorQueryResult> => {
  const { data } = await request({
    pathname,
    method: 'get',
    accessToken: getAccessToken(),
  });

  return data;
};

export const useGetMyProfile = (): SWRResponse<
  VendorQueryResult,
  SingleResponse<ProfileResponse>
> => useSWR('/me/profile', getMyProfile);
