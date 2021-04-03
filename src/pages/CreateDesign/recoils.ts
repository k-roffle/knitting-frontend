import { atom } from 'recoil';

import { DESIGN, DetailInputs, PAGE, PAGE_TYPE, PATTERN } from './types';

export const currentStepAtom = atom<PAGE_TYPE>({
  key: 'currentStep',
  default: PAGE.DETAIL,
});

export const currentDetailInputsAtom = atom<DetailInputs>({
  key: 'currentDetailInputs',
  default: {
    name: '',
    designType: DESIGN.SWEATER,
    patternType: PATTERN.TEXT,
    stitches: 0,
    rows: 0,
    totalLength: 0,
    retailLength: 0,
    shoulderLength: 0,
    bottomLength: 0,
    armLength: 0,
    needle: '',
    yarn: null,
    extra: null,
    price: 0,
    pattern: '',
  },
});
