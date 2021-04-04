import { atom } from 'recoil';

import { DESIGN, DesignInputs, PAGE, PAGE_TYPE, PATTERN } from './types';

export const currentStepAtom = atom<PAGE_TYPE>({
  key: 'currentStep',
  default: PAGE.DETAIL,
});

export const currentDesignInputsAtom = atom<DesignInputs>({
  key: 'currentDesignInputs',
  default: {
    name: '',
    designType: DESIGN.SWEATER,
    patternType: PATTERN.TEXT,
    stitches: 0,
    rows: 0,
    totalLength: 0,
    sleeveLength: 0,
    shoulderWidth: 0,
    bottomWidth: 0,
    armholeDepth: 0,
    needle: '',
    yarn: undefined,
    extra: undefined,
    price: 0,
    pattern: '',
  },
});
