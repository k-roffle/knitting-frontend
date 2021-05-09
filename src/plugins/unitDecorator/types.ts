import { blue } from '@material-ui/core/colors';
import { deepOrange } from 'themes/colors/deepOrange';
import { palette } from 'themes/palatte';

export const UnitDecoratorStyleMap = {
  NOT_CALCULATE: {
    background: palette.action.disabledBackground,
    color: palette.text.primary,
  },
  STITCH_CALCULATE_ROUND: {
    background: palette.primary.main,
    color: palette.background.paper,
  },
  STITCH_CALCULATE_ROUND_UP: {
    background: deepOrange[900],
    color: palette.background.paper,
  },
  STITCH_CALCULATE_ROUND_DOWN: {
    background: deepOrange[300],
    color: palette.background.paper,
  },
  ROW_CALCULATE_ROUND: {
    background: palette.secondary.main,
    color: palette.background.paper,
  },
  ROW_CALCULATE_ROUND_UP: {
    background: blue[900],
    color: palette.background.paper,
  },
  ROW_CALCULATE_ROUND_DOWN: {
    background: blue[300],
    color: palette.background.paper,
  },
};
