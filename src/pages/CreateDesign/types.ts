export const PAGE = {
  DETAIL: 'DETAIL',
  PATTERN: 'PATTERN',
  REVIEW: 'REVIEW',
} as const;

export type PAGE_TYPE = typeof PAGE[keyof typeof PAGE];
