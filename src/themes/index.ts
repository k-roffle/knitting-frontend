import { createMuiTheme } from '@material-ui/core';

import { overrides } from './overrides';
import { palette } from './palatte';
import { typography } from './typography';
import { zIndex } from './zIndex';

export const theme = createMuiTheme({
  spacing: (factor) => `${8 * factor}px`,
  palette,
  typography,
  overrides,
  zIndex,
});
