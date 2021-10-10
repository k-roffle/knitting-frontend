import { SnakeToCamelCase } from 'utils/types';

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

export const LEVEL = {
  EASY: 'EASY',
  NORMAL: 'NORMAL',
  HARD: 'HARD',
} as const;
export type LEVEL_TYPE = typeof LEVEL[keyof typeof LEVEL];

export const LevelKind = [
  {
    value: LEVEL.EASY,
    label: '쉬움',
    description: '이제 막 뜨개질을 시작한 사람!',
  },
  {
    value: LEVEL.NORMAL,
    label: '보통',
    description: '겉뜨기, 안뜨기, 코잡기는 쉽게 가능한 사람!',
  },
  {
    value: LEVEL.HARD,
    label: '어려움',
    description: '니트, 양말, 모자 하나 정도는 떠본 사람!',
  },
];

type NewDesignSize = {
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
  size: NewDesignSize;
  needle: string;
  yarn: string;
  extra?: string;
  pattern: string;
};

export type DesignInput = SnakeToCamelCase<PostDesignInput>;
