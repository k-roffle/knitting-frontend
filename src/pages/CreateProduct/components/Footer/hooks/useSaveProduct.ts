import { FAILED_TO_SAVE_PRODUCT } from 'knitting/constants/errors';
import { usePost } from 'knitting/hooks/usePost';
import {
  currentProductInputAtom,
  currentStepAtom,
} from 'knitting/pages/CreateProduct/recoils';
import { PAGE } from 'knitting/pages/CreateProduct/types';
import { splitText } from 'knitting/utils/splitText';

import { useRecoilValue, useSetRecoilState } from 'recoil';

type SaveProduct = {
  saveProduct: () => void;
};

export const useSaveProduct = (): SaveProduct => {
  const setCurrentStep = useSetRecoilState(currentStepAtom);

  const {
    name,
    fullPrice,
    discountPrice,
    representativeImageUrl,
    specifiedSalesStartDate,
    specifiedSalesEndDate,
    tags,
    designIds,
  } = useRecoilValue(currentProductInputAtom);

  const onSuccess = () => {
    if (data) {
      // TODO FIX
      // setCurrentProductId(data.payload.id);
    }
    setCurrentStep(PAGE.INTRODUCTION);
  };

  const { data, mutate } = usePost({
    pathname: '/product/package',
    errorMessage: FAILED_TO_SAVE_PRODUCT,
    onSuccess,
  });

  const saveProduct = (): void => {
    const postProductData = {
      id: null,
      name,
      full_price: fullPrice,
      discount_price: discountPrice,
      representative_image_url: representativeImageUrl,
      specified_sales_start_date: specifiedSalesStartDate,
      specified_sales_end_date: specifiedSalesEndDate,
      tags: splitText(tags, '#'),
      design_ids: designIds,
    };

    mutate(postProductData);
  };

  return { saveProduct };
};
