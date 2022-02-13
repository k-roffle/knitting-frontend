import CommonStepProgressBar from 'knitting/components/CommonStepProgressBar';
import { currentStepAtom } from 'knitting/pages/CreateDesign/atom';

import React from 'react';
import { useRecoilValue } from 'recoil';

const StepProgressBar = (): React.ReactElement => {
  const currentStep = useRecoilValue(currentStepAtom);
  const steps = ['표지 만들기', '기본 정보 입력', '도안 작성', '최종 확인'];

  return <CommonStepProgressBar steps={steps} currentStep={currentStep} />;
};

export default StepProgressBar;
