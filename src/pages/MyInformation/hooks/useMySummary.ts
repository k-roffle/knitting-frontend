import { useGet } from 'knitting/hooks/useGet';
import { ObjectResponse } from 'knitting/utils/requestType';

import { SummaryResponse } from '../types';

export const useMySummary = () => {
  const { data } = useGet<ObjectResponse<SummaryResponse>>({
    pathname: '/me/profile/summary',
  });

  return data
    ? {
        myDesignsCount: data.payload.my_designs_count,
        myProductsCount: data.payload.my_products_count,
        purchasedProductsCount: data.payload.purchased_products_count,
      }
    : {
        myDesignsCount: 0,
        myProductsCount: 0,
        purchasedProductsCount: 0,
      };
};
