import {
  currentDesignInputAtom,
  currentStepAtom,
  localCoverImageAtom,
} from 'pages/CreateDesign/recoils';
import { PAGE } from 'pages/CreateDesign/types';
import { useRecoilState, useRecoilValue } from 'recoil';
import { hasEmptyValue, hasNegativeNumber } from 'utils/validation';

import { useSaveDesign } from './useSaveDesign';

type StepController = {
  onPreviousClick: () => void;
  onNextClick: () => void;
  renderNextLabel: () => string;
  isNextDisabled: () => boolean;
};

export const useStepController = (): StepController => {
  const [currentStep, setCurrentStep] = useRecoilState(currentStepAtom);
  const {
    name,
    stitches,
    rows,
    size,
    needle,
    yarn,
    description,
    techniques,
  } = useRecoilValue(currentDesignInputAtom);
  const {
    totalLength,
    sleeveLength,
    shoulderWidth,
    bottomWidth,
    armholeDepth,
  } = size;
  const localCoverImage = useRecoilValue(localCoverImageAtom);

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

  const isInvalidDetailValue = (): boolean => {
    const isInvalidNumberInput = hasNegativeNumber([
      stitches,
      rows,
      totalLength,
      sleeveLength,
      shoulderWidth,
      bottomWidth,
      armholeDepth,
    ]);

    const isInvalidRequiredValue = hasEmptyValue([
      name,
      description,
      techniques,
      needle,
      yarn,
      localCoverImage[0]?.url,
    ]);

    return isInvalidRequiredValue || isInvalidNumberInput;
  };

  const isNextDisabled = (): boolean => {
    switch (currentStep) {
      case PAGE.COVER:
        if (isInvalidDetailValue()) {
          return true;
        }
        return false;
      case PAGE.OUTLINE:
        return false;
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
