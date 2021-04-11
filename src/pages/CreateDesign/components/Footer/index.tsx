import Button, { SIDE } from 'dumbs/Button';
import { currentStepAtom } from 'pages/CreateDesign/recoils';
import { PAGE } from 'pages/CreateDesign/types';
import React from 'react';
import { useRecoilState } from 'recoil';

const Footer = (): React.ReactElement => {
  const [currentStep, setCurrentStep] = useRecoilState(currentStepAtom);

  const saveDesign = async (): Promise<void> => {
    // TODO: 저장 기능 구현
  };

  const handleOnClickPrevious = (): void => {
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
        saveDesign();
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
        <Button side={SIDE.LEFT} label="이전" onClick={handleOnClickPrevious} />
      )}
      <Button
        side={SIDE.RIGHT}
        label={renderNextLabel()}
        onClick={handleOnClickNext}
      />
    </div>
  );
};

export default Footer;
