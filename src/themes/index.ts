import { createTheme } from '@mui/material/styles';

import { components } from './overrides';
import { palette } from './palette';
import { typography } from './typography';
import { zIndex } from './zIndex';

export const theme = createTheme({
  palette,
  typography,
  components,
  zIndex,
});
