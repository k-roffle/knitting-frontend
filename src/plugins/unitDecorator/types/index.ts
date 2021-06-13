import {
  REPEAT_APPROXIMATION,
  REPEAT_DETAIL_APPROXIMATION,
  REPEAT_DETAIL_APPROXIMATION_TYPE,
  REPEAT_DISPLAY_APPROXIMATION,
  ROW_REPEAT_DISPLAY_DETAIL_APPROXIMATION,
  STITCH_REPEAT_DISPLAY_DETAIL_APPROXIMATION,
} from './repeats';
import { UnitDecoratorStyleMap } from './styles';
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
  | REPEAT_DETAIL_APPROXIMATION_TYPE
  | typeof NOT_CALCULATE;

export type REPEAT_APPROXIMATION_TYPE =
  | typeof REPEAT_APPROXIMATION[keyof typeof REPEAT_APPROXIMATION]
  | typeof NOT_CALCULATE;

export {
  STITCH_APPROXIMATION,
  ROW_APPROXIMATION,
  STITCH_DISPLAY_APPROXIMATION,
  ROW_DISPLAY_APPROXIMATION,
  REPEAT_APPROXIMATION,
  REPEAT_DISPLAY_APPROXIMATION,
  REPEAT_DETAIL_APPROXIMATION,
  STITCH_REPEAT_DISPLAY_DETAIL_APPROXIMATION,
  ROW_REPEAT_DISPLAY_DETAIL_APPROXIMATION,
  UnitDecoratorStyleMap,
};
