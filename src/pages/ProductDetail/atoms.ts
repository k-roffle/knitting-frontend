import { atom } from 'recoil';
import { SnakeToCamelCase } from 'utils/types';

import { Product } from './types';

export const productAtom = atom<Partial<SnakeToCamelCase<Product>>>({
  key: 'product',
  default: {
    name: '',
    fullPrice: undefined,
    discountPrice: undefined,
    representativeImageUrl: '',
    tags: [''],
  },
});
