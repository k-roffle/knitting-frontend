import { Product } from 'knitting/pages/ProductDetail/types';

export type DesignItemResponse = {
  id: string;
  name: string;
  yarn: string;
  cover_image_url: string;
  price: number;
  tags: string[];
  created_at: string;
};

export type ProfileResponse = {
  email: string;
  profile_image_url: string | null;
  name: string | null;
};

export type SalesSummaryResponse = {
  number_of_products_on_sales: number;
  number_of_products_sold: number;
};

export type ProductItemResponse = Omit<
  Product,
  'content' | 'items' | 'created_at'
>;
