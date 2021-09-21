import { Step, Stepper } from '@material-ui/core';
import StepLabel from '@material-ui/core/StepLabel';
import React from 'react';
import styled, { css } from 'styled-components';
import { palette } from 'themes/palette';
import { zIndex } from 'themes/zIndex';

import { PAGE_TYPE } from '../../pages/CreateProduct/types';

interface StepIconProps {
  active: boolean;
  completed: boolean;
}

const StepIcon = styled.div<StepIconProps>`
  color: ${palette.grey[200]};
  display: flex;
  height: 22px;
  z-index: ${zIndex.mobileStepper};
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

const CommonStepProgressBar = ({
  steps,
  currentStep,
}: {
  steps: string[];
  currentStep: PAGE_TYPE;
}): React.ReactElement => {
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

export default CommonStepProgressBar;
