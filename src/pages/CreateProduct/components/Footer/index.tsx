import { Button as MaterialButton } from '@material-ui/core';
import { Button } from 'dumbs';
import {
  currentProductInputAtom,
  currentStepAtom,
} from 'pages/CreateProduct/recoils';
import { PAGE } from 'pages/CreateProduct/types';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { FooterContainer } from 'styles/constants';

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

  const saveProduct = () => {
    console.log('저장');
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
        setCurrentStep(PAGE.INTRODUCTION);
        break;
      case PAGE.INTRODUCTION:
        setCurrentStep(PAGE.CONFIRM);
        break;
      case PAGE.CONFIRM:
        saveProduct();
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
    </FooterContainer>
  );
};

export default Footer;
