import { Button as MaterialButton } from '@material-ui/core';
import { Button } from 'dumbs';
import { currentStepAtom } from 'pages/CreateDesign/recoils';
import { PAGE } from 'pages/CreateDesign/types';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { FooterContainer } from 'styles/constants';

import { useStepController } from './hooks/useStepController';

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
        {currentStep === PAGE.DETAIL ? '취소' : '이전'}
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
