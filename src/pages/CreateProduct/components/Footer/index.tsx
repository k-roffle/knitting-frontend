import { Button } from 'knitting/dumbs';
import {
  currentCreateProductStepAtom,
  isShowAtom,
} from 'knitting/pages/CreateProduct/atom';
import { PAGE } from 'knitting/pages/CreateProduct/types';
import { FooterContainer } from 'knitting/styles/constants';

import { Button as MaterialButton } from '@mui/material';
import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import useProduct from './hooks/useProduct';

const Footer = (): React.ReactElement => {
  const { DESIGN, PACKAGE, INTRODUCTION, CONFIRM } = PAGE;
  const [currentStep, setCurrentStep] = useRecoilState(
    currentCreateProductStepAtom,
  );
  const setIsShow = useSetRecoilState(isShowAtom);
  const { draftProduct } = useProduct();

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
    if (currentStep !== CONFIRM) {
      draftProduct();
    }

    switch (currentStep) {
      case DESIGN:
        setCurrentStep(PACKAGE);
        break;
      case PACKAGE:
        setCurrentStep(INTRODUCTION);
        break;
      case INTRODUCTION:
        setCurrentStep(CONFIRM);
        break;
      case CONFIRM:
        setIsShow(true);
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
      <Button
        label={renderNextLabel()}
        onClick={handleOnClickNext}
        sx={{ marginLeft: 'auto' }}
      />
    </FooterContainer>
  );
};

export default Footer;
