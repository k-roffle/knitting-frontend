import { SnakeToCamelCase } from 'knitting/utils/types';

import { DesignItemResponse } from '../MyInformation/hooks/types';

export const PAGE = {
  DESIGN: 0,
  PACKAGE: 1,
  INTRODUCTION: 2,
  CONFIRM: 3,
} as const;

export type PAGE_TYPE = typeof PAGE[keyof typeof PAGE];

export type PostProductInput = {
  name: string;
  design_ids: string[];
  full_price: number;
  discount_price: number;
  representative_image_url: string;
  specified_sales_started_at: string | null;
  specified_sales_ended_at: string | null;
  tags: string[];
  content: string;
  draft_id: string | null;
};

export type ProductInput = Omit<SnakeToCamelCase<PostProductInput>, 'tags'> & {
  tags: string;
  designs: DesignItemResponse[];
};

export interface ProductAction {
  draftProduct: () => void;
  saveProduct: () => void;
}

export interface DraftProductRequest {
  id: string | null;
  product_id: string | null;
  value: string;
}

export interface DraftProduct {
  id: string;
}
