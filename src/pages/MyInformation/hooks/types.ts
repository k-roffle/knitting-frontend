export type DesignItemResponse = {
  id: number;
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
