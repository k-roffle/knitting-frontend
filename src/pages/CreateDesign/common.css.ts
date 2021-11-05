import { Grid, Input } from '@material-ui/core';
import styled from 'styled-components';
import { theme } from 'themes';

export const FullWidthInput = styled(Input)`
  width: 100%;
`;

export const Row = styled(Grid)`
  padding: ${theme.spacing(1.5)};
`;
