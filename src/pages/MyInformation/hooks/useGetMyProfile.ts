import { ObjectResponse } from 'knitting/utils/requestType';
import { getRequest } from 'knitting/utils/requests';
import { UseQueryResult } from 'react-query/types/react/types';

import { useQuery } from 'react-query';

import { ProfileResponse } from './types';

const fetchMyProfile = () => {
  return getRequest('/me/profile');
};

export const useGetMyProfile = (): UseQueryResult<
  ObjectResponse<ProfileResponse>
> => {
  return useQuery('my-profile', fetchMyProfile);
};
