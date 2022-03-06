import { SnakeToCamelCase } from 'knitting/utils/types';

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
  specified_sales_start_date: string | null;
  specified_sales_end_date: string | null;
  tags: string[];
};

export type ProductInput = Omit<SnakeToCamelCase<PostProductInput>, 'tags'> & {
  tags: string;
};
