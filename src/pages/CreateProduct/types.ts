import { SnakeToCamelCase } from 'knitting/utils/types';

import { DesignItemResponse } from '../MyInformation/hooks/types';

export const PAGE = {
  DESIGN: 0,
  PACKAGE: 1,
  INTRODUCTION: 2,
  CONFIRM: 3,
} as const;

export type PAGE_TYPE = typeof PAGE[keyof typeof PAGE];

export type ProductId = {
  id: number;
};

export type PostProductInput = {
  name: string;
  design_ids: number[];
  full_price: number;
  discount_price: number;
  representative_image_url: string;
  specified_sales_started_at: string | null;
  specified_sales_ended_at: string | null;
  tags: string[];
};

export type ProductInput = Omit<
  SnakeToCamelCase<PostProductInput>,
  'tags' | 'designIds'
> & {
  tags: string;
  designs: DesignItemResponse[];
};
