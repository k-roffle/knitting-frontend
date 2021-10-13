import { FAILED_TO_SAVE_PRODUCT } from 'constants/errors';

import { Button as MaterialButton } from '@material-ui/core';
import { Button, Snackbar } from 'dumbs';
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

  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const handleSnackbarClose = () => {
    setOpenErrorSnackbar(false);
  };

  const saveProduct = async (): Promise<void> => {
    try {
      await requestSaveProduct();
      window.location.reload();
    } catch (e) {
      setOpenErrorSnackbar(true);
    }
  };

  const requestSaveProduct = async (): Promise<void> => {
    await request({
      pathname: '/product/package',
      method: 'post',
      data: {
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
      },
      useCurrentToken: true,
    });
  };

  const handleOnClickPrevious = (): void => {
    switch (currentStep) {
      case PAGE.PACKAGE:
        setCurrentStep(PAGE.DESIGN);
        break;
      case PAGE.INTRODUCTION:
        setCurrentStep(PAGE.PACKAGE);
        break;
      case PAGE.CONFIRM:
        setCurrentStep(PAGE.INTRODUCTION);
        break;
      default:
        break;
    }
  };

  const renderNextLabel = (): string => {
    switch (currentStep) {
      case PAGE.DESIGN:
        return '도안 선택 완료';
      case PAGE.PACKAGE:
        return '상품 구성 완료';
      case PAGE.INTRODUCTION:
        return '상품 소개 완료';
      case PAGE.CONFIRM:
        return '판매 시작';
      default:
        return '도안 선택 완료';
    }
  };

  const handleOnClickNext = (): void => {
    switch (currentStep) {
      case PAGE.DESIGN:
        setCurrentStep(PAGE.PACKAGE);
        break;
      case PAGE.PACKAGE:
        saveProduct();
        break;
      case PAGE.INTRODUCTION:
        setCurrentStep(PAGE.CONFIRM);
        break;
      case PAGE.CONFIRM:
        break;
      default:
        break;
    }
  };

  return (
    <FooterContainer>
      {currentStep !== PAGE.DESIGN && (
        <MaterialButton variant="contained" onClick={handleOnClickPrevious}>
          이전
        </MaterialButton>
      )}
      <Button label={renderNextLabel()} onClick={handleOnClickNext} />
      <Snackbar
        label={FAILED_TO_SAVE_PRODUCT}
        onClose={handleSnackbarClose}
        open={openErrorSnackbar}
        severity="error"
      />
    </FooterContainer>
  );
};

export default Footer;
