import {
  currentStepAtom,
  OptionalOutlineInput,
  optionalOutlineInputAtom,
  sizeValidationAtom,
  stepValidationsAtom,
} from 'knitting/pages/EditDesign/atom';
import { PAGE } from 'knitting/pages/EditDesign/types';
import { checkInvalid } from 'knitting/pages/EditDesign/utils';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { useSaveDesign } from './useSaveDesign';

type StepController = {
  onPreviousClick: () => void;
  onNextClick: () => void;
  changeValidation: (values: unknown[]) => void;
  changeSizeValidation: () => void;
};

export const useStepController = (): StepController => {
  const [currentStep, setCurrentStep] = useRecoilState(currentStepAtom);
  const { size } = useRecoilValue<OptionalOutlineInput>(
    optionalOutlineInputAtom,
  );
  const setStepValidations = useSetRecoilState(stepValidationsAtom);
  const setSizeValidation = useSetRecoilState(sizeValidationAtom);
  const { draftDesign, saveDesign } = useSaveDesign();
  const {
    totalLength,
    armholeDepth,
    sleeveLength,
    shoulderWidth,
    bottomWidth,
  } = size;

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
    if (currentStep !== PAGE.REVIEW) {
      draftDesign();
    }

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
        saveDesign();
        break;
      default:
        break;
    }
  };

  const changeValidation = (values: unknown[]): void => {
    setStepValidations((prev) =>
      prev.map((validation, index) =>
        index === currentStep
          ? values.every((value) => !checkInvalid(value))
          : validation,
      ),
    );
  };

  const changeSizeValidation = () => {
    const totalSize =
      totalLength + armholeDepth + sleeveLength + bottomWidth + shoulderWidth;

    if (totalSize > 0) {
      if (
        totalLength === 0 ||
        armholeDepth === 0 ||
        sleeveLength === 0 ||
        bottomWidth === 0 ||
        shoulderWidth === 0
      ) {
        setSizeValidation(false);
      }
    }
  };

  return {
    onPreviousClick,
    onNextClick,
    changeValidation,
    changeSizeValidation,
  };
};
