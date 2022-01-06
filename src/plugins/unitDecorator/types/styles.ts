import { deepOrange, blue } from '@material-ui/core/colors';
import { palette } from 'knitting/themes/palette';

import { REPEAT_DETAIL_APPROXIMATION } from './repeats';
import { STITCH_APPROXIMATION, ROW_APPROXIMATION } from './units';

const UNIT_COLORS = {
  STITCH_ROUND_DOWN: {
    background: deepOrange[300],
    color: palette.background.paper,
  },
  STITCH_ROUND: {
    background: palette.primary.main,
    color: palette.background.paper,
  },
  STITCH_ROUND_UP: {
    background: deepOrange[900],
    color: palette.background.paper,
  },
  ROW_ROUND_DOWN: {
    background: blue[300],
    color: palette.background.paper,
  },
  ROW_ROUND: {
    background: palette.secondary.main,
    color: palette.background.paper,
  },
  ROW_ROUND_UP: {
    background: blue[900],
    color: palette.background.paper,
  },
  NOT_CALCULATE: {
    background: palette.action.disabledBackground,
    color: palette.text.primary,
  },
};

export const UnitDecoratorStyleMap = {
  NOT_CALCULATE: UNIT_COLORS.NOT_CALCULATE,
  [STITCH_APPROXIMATION.STITCH_CALCULATE_ROUND]: UNIT_COLORS.STITCH_ROUND,
  [STITCH_APPROXIMATION.STITCH_CALCULATE_ROUND_UP]: UNIT_COLORS.STITCH_ROUND_UP,
  [STITCH_APPROXIMATION.STITCH_CALCULATE_ROUND_DOWN]:
    UNIT_COLORS.STITCH_ROUND_DOWN,
  [ROW_APPROXIMATION.ROW_CALCULATE_ROUND]: UNIT_COLORS.ROW_ROUND,
  [ROW_APPROXIMATION.ROW_CALCULATE_ROUND_UP]: UNIT_COLORS.ROW_ROUND_UP,
  [ROW_APPROXIMATION.ROW_CALCULATE_ROUND_DOWN]: UNIT_COLORS.ROW_ROUND_DOWN,
  [REPEAT_DETAIL_APPROXIMATION.STITCH_REPEAT_CALCULATE_ROUND]:
    UNIT_COLORS.STITCH_ROUND,
  [REPEAT_DETAIL_APPROXIMATION.STITCH_REPEAT_CALCULATE_ROUND_UP]:
    UNIT_COLORS.STITCH_ROUND_UP,
  [REPEAT_DETAIL_APPROXIMATION.STITCH_REPEAT_CALCULATE_ROUND_DOWN]:
    UNIT_COLORS.STITCH_ROUND_DOWN,
  [REPEAT_DETAIL_APPROXIMATION.ROW_REPEAT_CALCULATE_ROUND]:
    UNIT_COLORS.ROW_ROUND,
  [REPEAT_DETAIL_APPROXIMATION.ROW_REPEAT_CALCULATE_ROUND_UP]:
    UNIT_COLORS.ROW_ROUND_UP,
  [REPEAT_DETAIL_APPROXIMATION.ROW_REPEAT_CALCULATE_ROUND_DOWN]:
    UNIT_COLORS.ROW_ROUND_DOWN,
};
