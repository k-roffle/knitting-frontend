export const PAGE = {
  DETAIL: 0,
  PATTERN: 1,
  REVIEW: 2,
} as const;

export type PAGE_TYPE = typeof PAGE[keyof typeof PAGE];

export const DESIGN = {
  SWEATER: 'Sweater',
} as const;

export type DESIGN_TYPE = typeof DESIGN[keyof typeof DESIGN];

export const PATTERN = {
  TEXT: 'Text',
  IMAGE: 'Image',
  VIDEO: 'Video',
} as const;

export type PATTERN_TYPE = typeof PATTERN[keyof typeof PATTERN];

export type DesignInput = {
  name: string;
  designType: DESIGN_TYPE;
  patternType: PATTERN_TYPE;
  stitches: number;
  rows: number;
  totalLength: number;
  sleeveLength: number;
  shoulderWidth: number;
  bottomWidth: number;
  armholeDepth: number;
  needle: string;
  yarn: string;
  extra?: string;
  price: number;
  pattern: string;
};
