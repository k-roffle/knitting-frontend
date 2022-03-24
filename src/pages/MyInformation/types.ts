import { SnakeToCamelCase } from 'knitting/utils/types';

export const DESIGN_MENU = {
  CREATED_DESIGN: 'created_design',
  DESIGN_ON_SALE: 'design_on_sale',
  PURCHASED_DESIGN: 'purchased_design',
} as const;

export type DESIGN_MENU_TYPE = typeof DESIGN_MENU[keyof typeof DESIGN_MENU];

export type SummaryResponse = {
  my_designs_count: number;
  my_products_count: number;
  purchased_products_count: number;
};

export type Summary = SnakeToCamelCase<SummaryResponse>;
