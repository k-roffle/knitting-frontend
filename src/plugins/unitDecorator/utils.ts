import {
  UNIT_TYPE,
  UNIT_APPROXIMATION_TYPE,
  STITCH_APPROXIMATION,
  ROW_APPROXIMATION,
  REPEAT_DETAIL_APPROXIMATION,
  STITCH_DISPLAY_APPROXIMATION,
  ROW_DISPLAY_APPROXIMATION,
  REPEAT_DISPLAY_APPROXIMATION,
  ROW_REPEAT_DISPLAY_DETAIL_APPROXIMATION,
  STITCH_REPEAT_DISPLAY_DETAIL_APPROXIMATION,
} from './types';

export const getCalculateKey = (unit?: UNIT_TYPE): string => {
  switch (unit) {
    case '코':
      return 'STITCH_CALCULATE';
    case '단':
      return 'ROW_CALCULATE';
    case '번':
      return 'REPEAT_CALCULATE';
    default:
      return '';
  }
};

export const getOriginalStyle = (unit?: UNIT_TYPE): UNIT_APPROXIMATION_TYPE => {
  switch (unit) {
    case '코':
      return STITCH_APPROXIMATION.STITCH_CALCULATE_ROUND;
    case '단':
      return ROW_APPROXIMATION.ROW_CALCULATE_ROUND;
    case '번':
      return REPEAT_DETAIL_APPROXIMATION.STITCH_REPEAT_CALCULATE_ROUND;
    default:
      return STITCH_APPROXIMATION.STITCH_CALCULATE_ROUND;
  }
};

export const getDisplayedApproximations = (
  unit?: UNIT_TYPE,
  repeatDetailType?: Exclude<UNIT_TYPE, '번'>,
): Record<string, string> => {
  switch (unit) {
    case '코':
      return STITCH_DISPLAY_APPROXIMATION;
    case '단':
      return ROW_DISPLAY_APPROXIMATION;
    case '번':
      switch (repeatDetailType) {
        case '코':
          return STITCH_REPEAT_DISPLAY_DETAIL_APPROXIMATION;
        case '단':
          return ROW_REPEAT_DISPLAY_DETAIL_APPROXIMATION;
        default:
          return REPEAT_DISPLAY_APPROXIMATION;
      }
    default:
      return {};
  }
};
