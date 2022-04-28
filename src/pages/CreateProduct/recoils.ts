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
    specifiedSalesStartDate: null,
    specifiedSalesEndDate: null,
    tags: '',
    designIds: [],
  },
});

export const currentProductIdAtom = atom<number | undefined>({
  key: 'currentProductId',
  default: undefined,
});
