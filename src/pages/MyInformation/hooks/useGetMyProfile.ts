import { useQuery } from 'react-query';
import { UseQueryResult } from 'react-query/types/react/types';
import { ObjectResponse } from 'utils/requestType';
import { getRequest } from 'utils/requests';

import { ProfileResponse } from './types';

const fetchMyProfile = () => {
  return getRequest('/me/profile');
};

export const useGetMyProfile = (): UseQueryResult<
  ObjectResponse<ProfileResponse>
> => {
  return useQuery('my-profile', fetchMyProfile);
};
