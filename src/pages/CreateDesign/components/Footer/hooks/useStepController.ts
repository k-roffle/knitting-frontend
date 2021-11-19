import { coverInputAtom, currentStepAtom } from 'pages/CreateDesign/atom';
import useInvalidOutline from 'pages/CreateDesign/hooks/useInvalidOutline';
import { PAGE } from 'pages/CreateDesign/types';
import { useRecoilState, useRecoilValue } from 'recoil';
import { hasEmptyValue } from 'utils/validation';

import { useSaveDesign } from './useSaveDesign';

type StepController = {
  onPreviousClick: () => void;
  onNextClick: () => void;
  renderNextLabel: () => string;
  isNextDisabled: () => boolean;
};

export const useStepController = (): StepController => {
  const [currentStep, setCurrentStep] = useRecoilState(currentStepAtom);
  const { name, coverImageUrl } = useRecoilValue(coverInputAtom);
  const isInvalidOutlineValue = useInvalidOutline();
  const saveDesign = useSaveDesign();

  const onPreviousClick = (): void => {
    switch (currentStep) {
      case PAGE.OUTLINE:
        setCurrentStep(PAGE.COVER);
        break;
      case PAGE.PATTERN:
        setCurrentStep(PAGE.OUTLINE);
        break;
      case PAGE.REVIEW:
        setCurrentStep(PAGE.PATTERN);
        break;
      default:
        break;
    }
  };

  const onNextClick = (): void => {
    switch (currentStep) {
      case PAGE.COVER:
        setCurrentStep(PAGE.OUTLINE);
        break;
      case PAGE.OUTLINE:
        setCurrentStep(PAGE.PATTERN);
        break;
      case PAGE.PATTERN:
        setCurrentStep(PAGE.REVIEW);
        break;
      case PAGE.REVIEW:
        saveDesign?.();
        break;
      default:
        break;
    }
  };

  const renderNextLabel = (): string => {
    return currentStep === PAGE.REVIEW ? '저장' : '다음';
  };

  const isInvalidCoverValue = (): boolean => {
    return hasEmptyValue([name, coverImageUrl]);
  };

  const isNextDisabled = (): boolean => {
    switch (currentStep) {
      case PAGE.COVER:
        return isInvalidCoverValue();
      case PAGE.OUTLINE:
        return isInvalidOutlineValue;
      case PAGE.PATTERN:
        // TODO: 도안 유효성 검사
        return false;
      default:
        return false;
    }
  };

  return {
    onPreviousClick,
    onNextClick,
    renderNextLabel,
    isNextDisabled,
  };
};
