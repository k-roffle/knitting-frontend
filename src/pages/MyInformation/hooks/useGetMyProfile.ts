import useSWR, { SWRResponse } from 'swr';
import { getAccessToken } from 'utils/auth';
import { ObjectResponse } from 'utils/requestType';
import { request } from 'utils/requests';

import { ProfileResponse } from './types';

type MyProfileQueryResult = ObjectResponse<ProfileResponse>;

const getMyProfile = async (
  pathname: string,
): Promise<MyProfileQueryResult> => {
  const { data } = await request({
    pathname,
    method: 'get',
    accessToken: getAccessToken(),
  });

  return data;
};

export const useGetMyProfile = (): SWRResponse<
  MyProfileQueryResult,
  MyProfileQueryResult
> => useSWR('/me/profile', getMyProfile);
