import { Button as MaterialButton } from '@mui/material';
import { Button } from 'knitting/dumbs';
import { currentStepAtom } from 'knitting/pages/CreateProduct/recoils';
import { PAGE } from 'knitting/pages/CreateProduct/types';
import { FooterContainer } from 'knitting/styles/constants';
import React from 'react';
import { useRecoilState } from 'recoil';

import { useSaveProduct } from './hooks/useSaveProduct';
import { useStartSale } from './hooks/useStartSale';

const Footer = (): React.ReactElement => {
  const { DESIGN, PACKAGE, INTRODUCTION, CONFIRM } = PAGE;
  const [currentStep, setCurrentStep] = useRecoilState(currentStepAtom);
  const { saveProduct } = useSaveProduct();
  const { startSale } = useStartSale();

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
        startSale();
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
