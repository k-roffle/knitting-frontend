export const DESIGN_MENU = {
  CREATED_DESIGN: 'created_design',
  PRODUCT_ON_SALE: 'product_on_sale',
  PURCHASED_DESIGN: 'purchased_design',
} as const;

export type DESIGN_MENU_TYPE = typeof DESIGN_MENU[keyof typeof DESIGN_MENU];
