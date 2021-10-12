import { Step, Stepper } from '@material-ui/core';
import StepLabel from '@material-ui/core/StepLabel';
import renderStepIcon from 'components/RenderStepIcon';
import { PAGE_TYPE } from 'pages/CreateProduct/types';
import React from 'react';
import styled from 'styled-components';

const StyledStepLabel = styled(StepLabel)`
  word-break: keep-all;
`;

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
