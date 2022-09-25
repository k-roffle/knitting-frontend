import { useGet } from 'knitting/hooks/useGet';
import { ListResponse } from 'knitting/utils/requestType';

import { ProductItemResponse } from './types';

export const useMyProducts = () => {
  const { data } = useGet<ListResponse<ProductItemResponse>>({
    pathname: '/products/mine',
  });

  return data?.payload;
};
