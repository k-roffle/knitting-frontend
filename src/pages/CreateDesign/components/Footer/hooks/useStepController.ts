import {
  coverInputAtom,
  currentStepAtom,
  stepValidationsAtom,
} from 'knitting/pages/CreateDesign/atom';
import { PAGE } from 'knitting/pages/CreateDesign/types';

import { useRecoilState, useRecoilValue } from 'recoil';

import { checkInvalid } from '../../../utils';

import { useSaveDesign } from './useSaveDesign';

type StepController = {
  onPreviousClick: () => void;
  onNextClick: () => void;
  changeValidation: (values: unknown[]) => void;
};

export const useStepController = (): StepController => {
  const [currentStep, setCurrentStep] = useRecoilState(currentStepAtom);
  const { coverImageUrl } = useRecoilValue(coverInputAtom);
  const [stepValidations, setStepValidations] =
    useRecoilState(stepValidationsAtom);
  const { saveDesign } = useSaveDesign();

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
        saveDesign(coverImageUrl);
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
