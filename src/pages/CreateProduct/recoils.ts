import { atom } from 'recoil';

import { PAGE, PAGE_TYPE, ProductInput } from './types';

export const currentStepAtom = atom<PAGE_TYPE>({
  key: 'currentStep',
  default: PAGE.DESIGN,
});

export const currentProductInputAtom = atom<ProductInput>({
  key: 'currentProductInput',
  default: {
    name: '',
    fullPrice: 0,
    discountPrice: 0,
    representativeImageUrl: '',
    specifiedSalesStartedAt: null,
    specifiedSalesEndedAt: null,
    tags: '',
    designs: [],
  },
});

export const currentProductIdAtom = atom<string | undefined>({
  key: 'currentProductId',
  default: undefined,
});
