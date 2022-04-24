import styled from '@emotion/styled';
import { Grid, Input } from '@mui/material';

export const FullWidthInput = styled(Input)`
  width: 100%;
`;

export const Row = styled(Grid)`
  padding: ${({ theme }) => theme.spacing(1.5)};
`;
