import { createMuiTheme } from '@material-ui/core';

import { overrides } from './overrides';
import { palette } from './palatte';
import { typography } from './typography';

export const theme = createMuiTheme({
  palette,
  typography,
  overrides,
});
