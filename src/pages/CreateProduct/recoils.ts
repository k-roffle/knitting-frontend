import { atom } from 'recoil';

import { PAGE, PAGE_TYPE, ProductInput } from './types';

export const currentCreateProductStepAtom = atom<PAGE_TYPE>({
  key: 'currentCreateProductStep',
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
