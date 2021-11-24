import { FAILED_TO_GET_PRODUCT } from 'constants/errors';

import { useGet } from 'hooks/useGet';
import { UseQueryResult } from 'react-query/types/react/types';
import { ObjectResponse } from 'utils/requestType';

import { Product } from '../types';

export const useProduct = (
  productId: string,
): UseQueryResult<ObjectResponse<Product>, unknown> => {
  return useGet<ObjectResponse<Product>, unknown>({
    pathname: `/product/mine/${productId}`,
    errorMessage: FAILED_TO_GET_PRODUCT,
  });
};
