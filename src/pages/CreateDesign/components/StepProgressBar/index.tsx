import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import { currentStepAtom } from 'pages/CreateDesign/atom';
import React from 'react';
import { useRecoilValue } from 'recoil';

import {
  StepIcon,
  StepIconProps,
  StyledStepLabel,
} from './StepProgressBar.css';

const renderStepIcon = (props: StepIconProps): React.ReactElement => {
  return (
    <StepIcon {...props}>
      <div />
    </StepIcon>
  );
};

const StepProgressBar = (): React.ReactElement => {
  const currentStep = useRecoilValue(currentStepAtom);
  const steps = ['표지 만들기', '기본 정보 입력', '도안 작성', '최종 확인'];

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
