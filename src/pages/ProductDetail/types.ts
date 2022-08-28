export type Product = {
  id: number;
  name: string;
  full_price: number;
  discount_price: number;
  representative_image_url: string;
  specified_sales_started_at: string;
  specified_sales_ended_at: string;
  tags: string[];
  content: string;
  input_status: string;
  items: number[];
  created_at: string;
  updated_at: string;
};
