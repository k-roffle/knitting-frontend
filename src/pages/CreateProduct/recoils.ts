import { atom } from 'recoil';

import { PAGE, PAGE_TYPE, ProductInput } from './types';

export const draftProductIdAtom = atom<string | null>({
  key: 'draftProductId',
  default: null,
});

export const currentCreateProductStepAtom = atom<PAGE_TYPE>({
  key: 'currentCreateProductStep',
  default: PAGE.DESIGN,
});

export const currentProductInputAtom = atom<ProductInput>({
  key: 'currentProductInput',
  default: {
    name: '',
    content: '',
    designIds: [''],
    fullPrice: 0,
    discountPrice: 0,
    representativeImageUrl: '',
    specifiedSalesStartedAt: '',
    specifiedSalesEndedAt: '',
    tags: '',
    draftId: null,
    designs: [],
  },
});

export const currentProductIdAtom = atom<string | undefined>({
  key: 'currentProductId',
  default: undefined,
});
