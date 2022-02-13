import { SnakeToCamelCase } from 'knitting/utils/types';

export const PAGE = {
  COVER: 0,
  OUTLINE: 1,
  PATTERN: 2,
  REVIEW: 3,
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

export const LEVEL = {
  PERSON_BY_PERSON: 'PERSON_BY_PERSON',
  EASY: 'EASY',
  NORMAL: 'NORMAL',
  HARD: 'HARD',
} as const;
export type LEVEL_TYPE = typeof LEVEL[keyof typeof LEVEL];

export const LevelKind = [
  {
    value: LEVEL.PERSON_BY_PERSON,
    label: '사람마다 달라요.',
  },
  {
    value: LEVEL.EASY,
    label: '누구든 시도해볼 수 있어요.',
  },
  {
    value: LEVEL.NORMAL,
    label: '몇가지 작품을 만들어 봤다면 도전해 볼 만해요.',
  },
  {
    value: LEVEL.HARD,
    label: '새로운 도전을 기다리는 고수분들을 위해 준비했어요.',
  },
];

export type DesignSize = {
  total_length: number;
  sleeve_length: number;
  shoulder_width: number;
  bottom_width: number;
  armhole_depth: number;
};

export type PostDesignInput = {
  name: string;
  design_type: DESIGN_TYPE;
  pattern_type: PATTERN_TYPE;
  description: string;
  techniques: string[];
  target_level: LEVEL_TYPE;
  cover_image_url: string;
  stitches: number;
  rows: number;
  size: DesignSize;
  needle: string;
  yarn: string;
  extra?: string;
  price: number;
  pattern: string;
};

export type DesignInput = SnakeToCamelCase<PostDesignInput>;
