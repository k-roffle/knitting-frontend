import { FAILED_TO_SAVE_PRODUCT } from 'knitting/constants/errors';
import { usePost } from 'knitting/hooks/usePost';
import {
  currentProductIdAtom,
  currentProductInputAtom,
  currentCreateProductStepAtom,
} from 'knitting/pages/CreateProduct/recoils';
import { PAGE, PostProductInput } from 'knitting/pages/CreateProduct/types';
import { ObjectResponse } from 'knitting/utils/requestType';
import { splitText } from 'knitting/utils/splitText';

import { useRecoilValue, useSetRecoilState } from 'recoil';

type SaveProduct = {
  saveProduct: () => void;
};

interface productResponse {
  id: string;
}

export const useSaveProduct = (): SaveProduct => {
  const setCurrentStep = useSetRecoilState(currentCreateProductStepAtom);
  const setCurrentProductId = useSetRecoilState(currentProductIdAtom);

  const {
    name,
    fullPrice,
    discountPrice,
    representativeImageUrl,
    specifiedSalesStartedAt,
    specifiedSalesEndedAt,
    tags,
    designs,
  } = useRecoilValue(currentProductInputAtom);

  const onSuccess = ({ payload: { id } }: ObjectResponse<productResponse>) => {
    if (id) {
      setCurrentProductId(id);
    }
    setCurrentStep(PAGE.CONFIRM);
  };

  const { mutate } = usePost<ObjectResponse<productResponse>, PostProductInput>(
    {
      pathname: '/products',
      errorMessage: FAILED_TO_SAVE_PRODUCT,
      onSuccess,
    },
  );

  const saveProduct = (): void => {
    const postProductData = {
      id: null,
      name,
      full_price: fullPrice,
      discount_price: discountPrice,
      representative_image_url: representativeImageUrl,
      specified_sales_started_at: specifiedSalesStartedAt,
      specified_sales_ended_at: specifiedSalesEndedAt,
      tags: splitText(tags, '#'),
      design_ids: designs.map((design) => design.id),
      content: '',
      draft_id: null,
    };

    mutate(postProductData);
  };

  return { saveProduct };
};
