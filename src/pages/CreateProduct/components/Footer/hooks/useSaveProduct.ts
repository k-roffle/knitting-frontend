import { FAILED_TO_SAVE_PRODUCT } from 'constants/errors';

import { usePost } from 'hooks/usePost';
import {
  currentProductIdAtom,
  currentProductInputAtom,
  currentStepAtom,
} from 'pages/CreateProduct/recoils';
import { PAGE } from 'pages/CreateProduct/types';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { splitText } from 'utils/splitText';

type SaveProduct = {
  saveProduct: () => void;
};

export const useSaveProduct = (): SaveProduct => {
  const setCurrentStep = useSetRecoilState(currentStepAtom);
  const setCurrentProductId = useSetRecoilState(currentProductIdAtom);
  const [showError, setShowError] = useState(false);

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
      setCurrentProductId(data.payload.id);
    }
    setCurrentStep(PAGE.INTRODUCTION);
  };

  const { data, mutate } = usePost({
    pathname: '/product/package',
    errorMessage: FAILED_TO_SAVE_PRODUCT,
    onSuccess,
    onError: () => setShowError(true),
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
