import CommonStepProgressBar from 'knitting/components/CommonStepProgressBar';

import React from 'react';
import { useRecoilValue } from 'recoil';

import { currentCreateProductStepAtom } from '../../atom';

const StepProgressBar = (): React.ReactElement => {
  const currentStep = useRecoilValue(currentCreateProductStepAtom);
  const steps = ['도안 선택', '상품 구성', '상품 소개', '최종 확인'];

  return <CommonStepProgressBar steps={steps} currentStep={currentStep} />;
};

export default StepProgressBar;
