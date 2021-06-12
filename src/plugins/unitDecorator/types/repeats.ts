export const REPEAT_APPROXIMATION = {
  STITCH_REPEAT_CALCULATE_ROUND_DOWN: 'STITCH_REPEAT_CALCULATE_ROUND_DOWN',
  STITCH_REPEAT_CALCULATE_ROUND: 'STITCH_REPEAT_CALCULATE_ROUND',
  STITCH_REPEAT_CALCULATE_ROUND_UP: 'STITCH_REPEAT_CALCULATE_ROUND_UP',
  ROW_REPEAT_CALCULATE_ROUND_DOWN: 'ROW_REPEAT_CALCULATE_ROUND_DOWN',
  ROW_REPEAT_CALCULATE_ROUND: 'ROW_REPEAT_CALCULATE_ROUND',
  ROW_REPEAT_CALCULATE_ROUND_UP: 'ROW_REPEAT_CALCULATE_ROUND_UP',
} as const;

export const REPEAT_DISPLAY_APPROXIMATION = {
  [REPEAT_APPROXIMATION.STITCH_REPEAT_CALCULATE_ROUND_DOWN]: '코 내림',
  [REPEAT_APPROXIMATION.STITCH_REPEAT_CALCULATE_ROUND]: '코 반올림',
  [REPEAT_APPROXIMATION.STITCH_REPEAT_CALCULATE_ROUND_UP]: '코 올림',
  [REPEAT_APPROXIMATION.ROW_REPEAT_CALCULATE_ROUND_DOWN]: '단 내림',
  [REPEAT_APPROXIMATION.ROW_REPEAT_CALCULATE_ROUND]: '단 반올림',
  [REPEAT_APPROXIMATION.ROW_REPEAT_CALCULATE_ROUND_UP]: '단 올림',
  NOT_CALCULATE: '계산 안 함',
} as const;

export type REPEAT_APPROXIMATION_TYPE = typeof REPEAT_APPROXIMATION[keyof typeof REPEAT_APPROXIMATION];
