import { atom } from 'recoil';

import { DESIGN, DesignInput, PAGE, PAGE_TYPE, PATTERN } from './types';

export const currentStepAtom = atom<PAGE_TYPE>({
  key: 'currentStep',
  default: PAGE.DETAIL,
});

export const currentDesignInputAtom = atom<DesignInput>({
  key: 'currentDesignInput',
  default: {
    name: '',
    designType: DESIGN.SWEATER,
    patternType: PATTERN.TEXT,
    stitches: 1,
    rows: 1,
    totalLength: 1,
    sleeveLength: 1,
    shoulderWidth: 1,
    bottomWidth: 1,
    armholeDepth: 1,
    needle: '',
    yarn: undefined,
    extra: undefined,
    price: 0,
    pattern: '',
  },
});
