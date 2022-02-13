import { Button } from 'knitting/dumbs';
import { currentStepAtom } from 'knitting/pages/CreateDesign/atom';
import { FooterContainer } from 'knitting/pages/CreateDesign/components/Footer/Footer.css';
import { useStepController } from 'knitting/pages/CreateDesign/components/Footer/hooks/useStepController';
import { PAGE } from 'knitting/pages/CreateDesign/types';

import { Button as MaterialButton } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';

const Footer = (): React.ReactElement => {
  const currentStep = useRecoilValue(currentStepAtom);

  const { onPreviousClick, onNextClick, renderNextLabel, isNextDisabled } =
    useStepController();

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
