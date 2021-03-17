import { atom } from 'recoil';

import { PAGE, PAGE_TYPE } from './types';

export const currentStepAtom = atom<PAGE_TYPE>({
  key: 'currentStep',
  default: PAGE.DETAIL,
});
