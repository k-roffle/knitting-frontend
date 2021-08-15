export const DESIGN_MENU = {
  CREATED_DESIGN: 'created_design',
  DESIGN_ON_SALE: 'design_on_sale',
  PURCHASED_DESIGN: 'purchased_design',
} as const;

export type DESIGN_MENU_TYPE = typeof DESIGN_MENU[keyof typeof DESIGN_MENU];
