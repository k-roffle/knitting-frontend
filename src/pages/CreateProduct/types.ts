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

export type ProductInput = {
  name: string;
  fullPrice: number;
  discountPrice: number;
  representativeImageUrl: string;
  specifiedSalesStartDate?: string | null;
  specifiedSalesEndDate?: string | null;
  tags: string;
  designIds: number[];
};
