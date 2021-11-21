import { Grid, Input } from '@mui/material';
import { theme } from 'knitting/themes';
import styled from 'styled-components';

export const FullWidthInput = styled(Input)`
  width: 100%;
`;

export const Row = styled(Grid)`
  padding: ${theme.spacing(1.5)};
`;
