import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { currentStepAtom } from 'pages/CreateDesign/recoils';
import React from 'react';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { palette } from 'themes/palatte';

interface StepIconProps {
  active: boolean;
  completed: boolean;
}

const StyledStepIcon = styled.div<StepIconProps>`
  color: ${palette.grey[200]};
  display: flex;
  height: 22px;
  z-index: 1;
  align-items: center;
  ${(props) =>
    props.active &&
    css`
      color: ${palette.primary.main};
    `};
  div {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: currentColor;

    ${(props) =>
      props.completed &&
      css`
        color: ${palette.primary.main};
        font-size: 18px;
      `};
  }
`;

function StepIcon(props: StepIconProps) {
  return (
    <StyledStepIcon {...props}>
      <div />
    </StyledStepIcon>
  );
}

const StepProgressBar = (): React.ReactElement => {
  const currentStep = useRecoilValue(currentStepAtom);
  const steps = ['기본 정보 입력', '도안 작성', '최종 확인'];

  return (
    <Stepper alternativeLabel activeStep={currentStep}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepProgressBar;
