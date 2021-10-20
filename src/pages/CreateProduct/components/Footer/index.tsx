import { FAILED_TO_SAVE_PRODUCT } from 'constants/errors';
import { MY_INFORMATION_ROUTER_ROOT } from 'constants/path';

import { Button as MaterialButton } from '@material-ui/core';
import { useCommonSnackbar } from 'components/CommonSnackbar/useCommonSnackbar';
import { Button } from 'dumbs';
import { usePost } from 'hooks/usePost';
import {
  currentProductInputAtom,
  currentStepAtom,
} from 'pages/CreateProduct/recoils';
import { PAGE } from 'pages/CreateProduct/types';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { FooterContainer } from 'styles/constants';
import { request } from 'utils/requests';

const Footer = (): React.ReactElement => {
  const { DESIGN, PACKAGE, INTRODUCTION, CONFIRM } = PAGE;
  const [currentStep, setCurrentStep] = useRecoilState(currentStepAtom);
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

  const [showError, setShowError] = useState(false);

  const { mutate } = usePost({
    pathname: '/product/package',
    errorMessage: FAILED_TO_SAVE_PRODUCT,
    onSuccess: () => setCurrentStep(INTRODUCTION),
    onError: () => setShowError(true),
  });

  useCommonSnackbar({
    message: FAILED_TO_SAVE_PRODUCT,
    severity: 'error',
    dependencies: [showError],
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
      tags: tags
        .split('#')
        .map((tag) => tag.trim())
        .filter((value) => value),
      design_ids: designIds,
    };

    mutate(postProductData);
  };

  const handleOnClickPrevious = async (): Promise<void> => {
    switch (currentStep) {
      case PACKAGE:
        setCurrentStep(DESIGN);
        break;
      case INTRODUCTION:
        setCurrentStep(PACKAGE);
        break;
      case CONFIRM:
        setCurrentStep(INTRODUCTION);
        break;
      default:
        break;
    }
  };

  const renderNextLabel = (): string => {
    switch (currentStep) {
      case DESIGN:
        return '도안 선택 완료';
      case PACKAGE:
        return '상품 구성 완료';
      case INTRODUCTION:
        return '상품 소개 완료';
      case CONFIRM:
        return '판매 시작';
      default:
        return '도안 선택 완료';
    }
  };

  const handleOnClickNext = (): void => {
    switch (currentStep) {
      case DESIGN:
        setCurrentStep(PACKAGE);
        break;
      case PACKAGE:
        saveProduct();
        break;
      case INTRODUCTION:
        setCurrentStep(CONFIRM);
        break;
      case CONFIRM:
        break;
      default:
        break;
    }
  };

  return (
    <FooterContainer>
      {currentStep !== DESIGN && (
        <MaterialButton variant="contained" onClick={handleOnClickPrevious}>
          이전
        </MaterialButton>
      )}
      <Button label={renderNextLabel()} onClick={handleOnClickNext} />
    </FooterContainer>
  );
};

export default Footer;
