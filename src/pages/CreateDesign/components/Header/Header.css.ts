import styled from '@emotion/styled';
import { Typography } from '@mui/material';

export const Title = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  font-weight: 600;
`;

export const Contents = styled(Typography)`
  white-space: pre-line;
`;
