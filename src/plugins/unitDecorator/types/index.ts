import {
  REPEAT_APPROXIMATION,
  REPEAT_APPROXIMATION_TYPE,
  REPEAT_DISPLAY_APPROXIMATION,
} from './repeats';
import {
  STITCH_APPROXIMATION_TYPE,
  ROW_APPROXIMATION_TYPE,
  ROW_APPROXIMATION,
  ROW_DISPLAY_APPROXIMATION,
  STITCH_APPROXIMATION,
  STITCH_DISPLAY_APPROXIMATION,
} from './units';

const UNITS = {
  ROW: '코',
  STITCH: '단',
  REPEAT: '번',
} as const;

export const NOT_CALCULATE = 'NOT_CALCULATE';

export type UNIT_TYPE = typeof UNITS[keyof typeof UNITS];

export type UNIT_APPROXIMATION_TYPE =
  | STITCH_APPROXIMATION_TYPE
  | ROW_APPROXIMATION_TYPE
  | REPEAT_APPROXIMATION_TYPE
  | typeof NOT_CALCULATE;

export {
  STITCH_APPROXIMATION,
  ROW_APPROXIMATION,
  STITCH_DISPLAY_APPROXIMATION,
  ROW_DISPLAY_APPROXIMATION,
  REPEAT_APPROXIMATION,
  REPEAT_DISPLAY_APPROXIMATION,
};
