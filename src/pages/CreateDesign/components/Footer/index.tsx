import Button from 'dumbs/Button';
import { currentStepAtom } from 'pages/CreateDesign/recoils';
import { PAGE } from 'pages/CreateDesign/types';
import React from 'react';
import { useRecoilState } from 'recoil';

const Footer = (): React.ReactElement => {
  const [currentStep, setCurrentStep] = useRecoilState(currentStepAtom);

  const handleOnClickPreview = (): void => {
    switch (currentStep) {
      case PAGE.PATTERN:
        setCurrentStep(PAGE.DETAIL);
        break;
      case PAGE.REVIEW:
        setCurrentStep(PAGE.PATTERN);
        break;
      default:
        break;
    }
  };

  const handleOnClickNext = (): void => {
    switch (currentStep) {
      case PAGE.DETAIL:
        setCurrentStep(PAGE.PATTERN);
        break;
      case PAGE.PATTERN:
        setCurrentStep(PAGE.REVIEW);
        break;
      case PAGE.REVIEW:
        // TODO: 저장 기능 구현
        break;
      default:
        break;
    }
  };

  const renderNextLabel = (): string => {
    return currentStep === PAGE.REVIEW ? '저장' : '다음';
  };

  return (
    <div>
      {currentStep !== PAGE.DETAIL && (
        <Button side="left" label="이전" onClick={handleOnClickPreview} />
      )}
      <Button
        side="right"
        label={renderNextLabel()}
        onClick={handleOnClickNext}
      />
    </div>
  );
};

export default Footer;
