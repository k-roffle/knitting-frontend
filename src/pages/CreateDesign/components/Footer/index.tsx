import { Button as MaterialButton } from '@mui/material';
import { Button } from 'dumbs';
import { currentStepAtom } from 'pages/CreateDesign/atom';
import { FooterContainer } from 'pages/CreateDesign/components/Footer/Footer.css';
import { useStepController } from 'pages/CreateDesign/components/Footer/hooks/useStepController';
import { PAGE } from 'pages/CreateDesign/types';
import React from 'react';
import { useRecoilValue } from 'recoil';

const Footer = (): React.ReactElement => {
  const currentStep = useRecoilValue(currentStepAtom);

  const {
    onPreviousClick,
    onNextClick,
    renderNextLabel,
    isNextDisabled,
  } = useStepController();

  return (
    <FooterContainer>
      <MaterialButton variant="contained" onClick={onPreviousClick}>
        {currentStep === PAGE.COVER ? '취소' : '이전'}
      </MaterialButton>
      <Button
        onClick={onNextClick}
        label={renderNextLabel()}
        disabled={isNextDisabled()}
      />
    </FooterContainer>
  );
};

export default Footer;
