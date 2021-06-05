import { NOT_CALCULATE } from '.';

const UNIT_DISPLAY_APPROXIMATION = {
  ROUND_DOWN: '내림',
  ROUND: '반올림',
  ROUND_UP: '올림',
  NOT_CALCULATE: '계산 안함',
} as const;

export const STITCH_APPROXIMATION = {
  STITCH_CALCULATE_ROUND_DOWN: 'STITCH_CALCULATE_ROUND_DOWN',
  STITCH_CALCULATE_ROUND: 'STITCH_CALCULATE_ROUND',
  STITCH_CALCULATE_ROUND_UP: 'STITCH_CALCULATE_ROUND_UP',
} as const;

export const STITCH_DISPLAY_APPROXIMATION = {
  [STITCH_APPROXIMATION.STITCH_CALCULATE_ROUND_DOWN]:
    UNIT_DISPLAY_APPROXIMATION.ROUND_DOWN,
  [STITCH_APPROXIMATION.STITCH_CALCULATE_ROUND]:
    UNIT_DISPLAY_APPROXIMATION.ROUND,
  [STITCH_APPROXIMATION.STITCH_CALCULATE_ROUND_UP]:
    UNIT_DISPLAY_APPROXIMATION.ROUND_UP,
  [NOT_CALCULATE]: UNIT_DISPLAY_APPROXIMATION.NOT_CALCULATE,
} as const;

export type STITCH_APPROXIMATION_TYPE = typeof STITCH_APPROXIMATION[keyof typeof STITCH_APPROXIMATION];

export const ROW_APPROXIMATION = {
  ROW_CALCULATE_ROUND_DOWN: 'ROW_CALCULATE_ROUND_DOWN',
  ROW_CALCULATE_ROUND: 'ROW_CALCULATE_ROUND',
  ROW_CALCULATE_ROUND_UP: 'ROW_CALCULATE_ROUND_UP',
} as const;

export const ROW_DISPLAY_APPROXIMATION = {
  [ROW_APPROXIMATION.ROW_CALCULATE_ROUND_DOWN]:
    UNIT_DISPLAY_APPROXIMATION.ROUND_DOWN,
  [ROW_APPROXIMATION.ROW_CALCULATE_ROUND]: UNIT_DISPLAY_APPROXIMATION.ROUND,
  [ROW_APPROXIMATION.ROW_CALCULATE_ROUND_UP]:
    UNIT_DISPLAY_APPROXIMATION.ROUND_UP,
  [NOT_CALCULATE]: UNIT_DISPLAY_APPROXIMATION.NOT_CALCULATE,
} as const;

export type ROW_APPROXIMATION_TYPE = typeof ROW_APPROXIMATION[keyof typeof ROW_APPROXIMATION];
