import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { currentStepAtom } from 'pages/CreateDesign/recoils';
import React from 'react';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { palette } from 'themes/palette';
import { zIndex } from 'themes/zIndex';

interface StepIconProps {
  active: boolean;
  completed: boolean;
}

const StepIcon = styled.div<StepIconProps>`
  color: ${palette.grey[200]};
  display: flex;
  height: 22px;
  z-index: ${zIndex.drawer};
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

const StyledStepLabel = styled(StepLabel)`
  word-break: keep-all;
`;

const renderStepIcon = (props: StepIconProps): React.ReactElement => {
  return (
    <StepIcon {...props}>
      <div />
    </StepIcon>
  );
};

const StepProgressBar = (): React.ReactElement => {
  const currentStep = useRecoilValue(currentStepAtom);
  const steps = ['기본 정보 입력', '도안 작성', '최종 확인'];

  return (
    <Stepper alternativeLabel activeStep={currentStep}>
      {steps.map((label) => (
        <Step key={label}>
          <StyledStepLabel StepIconComponent={renderStepIcon}>
            {label}
          </StyledStepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepProgressBar;
