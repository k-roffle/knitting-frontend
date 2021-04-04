export const PAGE = {
  DETAIL: 0,
  PATTERN: 1,
  REVIEW: 2,
} as const;

export type PAGE_TYPE = typeof PAGE[keyof typeof PAGE];

export const DESIGN = {
  SWEATER: 'SWEATER',
} as const;

export type DESIGN_TYPE = typeof DESIGN[keyof typeof DESIGN];

export const PATTERN = {
  TEXT: 'TEXT',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
} as const;

export type PATTERN_TYPE = typeof PATTERN[keyof typeof PATTERN];

export type DesignInputs = {
  name: string;
  designType: DESIGN_TYPE;
  patternType: PATTERN_TYPE;
  stitches: number;
  rows: number;
  totalLength: number;
  retailLength: number;
  shoulderLength: number;
  bottomLength: number;
  armLength: number;
  needle: string;
  yarn: string | undefined;
  extra: string | undefined;
  price: number;
  pattern: string;
};
