import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { theme } from 'knitting/themes';

export const Title = styled(Typography)`
  margin-bottom: ${theme.spacing(2)};
  font-weight: 600;
`;

export const Contents = styled(Typography)`
  white-space: pre-line;
`;
