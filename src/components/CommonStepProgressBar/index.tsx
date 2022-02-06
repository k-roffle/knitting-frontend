import styled from '@emotion/styled';
import { Step, StepLabel, Stepper } from '@mui/material';
import renderStepIcon from 'knitting/components/RenderStepIcon';
import { PAGE_TYPE } from 'knitting/pages/CreateProduct/types';
import React from 'react';

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
