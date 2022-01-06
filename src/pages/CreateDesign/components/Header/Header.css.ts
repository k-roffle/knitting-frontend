import { Typography } from '@material-ui/core';
import { theme } from 'knitting/themes';
import styled from 'styled-components';

export const Title = styled(Typography)`
  margin-bottom: ${theme.spacing(2)};
  font-weight: 600;
`;

export const Contents = styled(Typography)`
  white-space: pre-line;
`;
