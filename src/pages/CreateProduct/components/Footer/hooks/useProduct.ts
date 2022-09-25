import {
  FAILED_TO_DRAFT_PRODUCT,
  FAILED_TO_SAVE_PRODUCT,
} from 'knitting/constants/errors';
import { usePost } from 'knitting/hooks/usePost';
import {
  currentProductIdAtom,
  currentProductInputAtom,
  draftProductIdAtom,
} from 'knitting/pages/CreateProduct/recoils';
import {
  DraftProductRequest,
  PostProductInput,
  DraftProduct,
  ProductAction,
} from 'knitting/pages/CreateProduct/types';
import { draftIdAtom } from 'knitting/pages/EditDesign/atom';
import { DraftDesign } from 'knitting/pages/EditDesign/types';
import { ObjectResponse } from 'knitting/utils/requestType';
import { splitText } from 'knitting/utils/splitText';

import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const useProduct = (): ProductAction => {
  const navigate = useNavigate();
  const draftProductId = useRecoilValue(draftProductIdAtom);
  const setCurrentProductId = useSetRecoilState(currentProductIdAtom);
  const setDraftId = useSetRecoilState(draftIdAtom);

  const {
    name,
    fullPrice,
    discountPrice,
    representativeImageUrl,
    specifiedSalesStartedAt,
    specifiedSalesEndedAt,
    tags,
    designIds,
  } = useRecoilValue(currentProductInputAtom);

  const onSuccessDraft = ({ payload: { id } }: ObjectResponse<DraftDesign>) => {
    if (id) {
      setDraftId(id);
    }
  };

  const onSuccessSave = ({ payload: { id } }: ObjectResponse<DraftProduct>) => {
    if (id) {
      setCurrentProductId(id);
      // TODO: 상품 상세 페이지로 이동
      // navigate(`/products/${id}`);
      navigate('/');
    } else {
      navigate('/');
    }
  };

  const { mutate: draft } = usePost<
    ObjectResponse<DraftProduct>,
    DraftProductRequest
  >({
    pathname: '/products/draft',
    errorMessage: FAILED_TO_DRAFT_PRODUCT,
    onSuccess: onSuccessDraft,
  });

  const { mutate: save } = usePost<
    ObjectResponse<DraftProduct>,
    PostProductInput
  >({
    pathname: '/products',
    errorMessage: FAILED_TO_SAVE_PRODUCT,
    onSuccess: onSuccessSave,
  });

  const draftProduct = (): void => {
    const postProductData = {
      id: draftProductId,
      product_id: null,
      value: JSON.stringify({
        name,
        full_price: fullPrice,
        discount_price: discountPrice,
        representative_image_url: representativeImageUrl,
        specified_sales_started_at: specifiedSalesStartedAt,
        specified_sales_ended_at: specifiedSalesEndedAt,
        tags: splitText(tags, '#'),
        design_ids: designIds,
        content: '',
        draft_id: null,
      }),
    };

    draft(postProductData);
  };

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
      design_ids: designIds,
      content: '',
      draft_id: null,
    };

    save(postProductData);
  };

  return { draftProduct, saveProduct };
};

export default useProduct;
