import CommonStepProgressBar from 'components/CommonStepProgressBar';
import { currentStepAtom } from 'pages/CreateDesign/recoils';
import React from 'react';
import { useRecoilValue } from 'recoil';

const StepProgressBar = (): React.ReactElement => {
  const currentStep = useRecoilValue(currentStepAtom);
  const steps = ['기본 정보 입력', '도안 작성', '최종 확인'];

  return <CommonStepProgressBar steps={steps} currentStep={currentStep} />;
};

export default StepProgressBar;
