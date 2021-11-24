import { atom } from 'recoil';

import { Product } from './types';

export const productAtom = atom<Partial<Product>>({
  key: 'product',
  default: {
    name: '',
    full_price: undefined,
    discount_price: undefined,
    representative_image_url: '',
    tags: [''],
  },
});
