import {
  coverInputAtom,
  currentStepAtom,
  stepValidationsAtom,
} from 'knitting/pages/CreateDesign/atom';
import { PAGE } from 'knitting/pages/CreateDesign/types';
import { checkInvalid } from 'knitting/pages/CreateDesign/utils';

import { useRecoilState, useRecoilValue } from 'recoil';

import { useSaveDesign } from './useSaveDesign';

type StepController = {
  onPreviousClick: () => void;
  onNextClick: () => void;
  changeValidation: (values: unknown[]) => void;
};

export const useStepController = (): StepController => {
  const [currentStep, setCurrentStep] = useRecoilState(currentStepAtom);
  const { name, coverImageUrl } = useRecoilValue(coverInputAtom);
  const [stepValidations, setStepValidations] =
    useRecoilState(stepValidationsAtom);
  const { draftDesign, saveDesign } = useSaveDesign();

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
        draftDesign();
        setCurrentStep(PAGE.OUTLINE);
        break;
      case PAGE.OUTLINE:
        draftDesign();
        setCurrentStep(PAGE.PATTERN);
        break;
      case PAGE.PATTERN:
        draftDesign();
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
    setStepValidations(
      stepValidations.map((validation, index) =>
        index === currentStep
          ? values.every((value) => !checkInvalid(value))
          : validation,
      ),
    );
  };

  return {
    onPreviousClick,
    onNextClick,
    changeValidation,
  };
};
