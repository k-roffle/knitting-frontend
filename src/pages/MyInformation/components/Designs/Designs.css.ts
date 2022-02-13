import { theme } from 'knitting/themes';

import styled from '@emotion/styled';
import { List } from '@mui/material';

export const StyledList = styled(List)`
  margin-top: ${theme.spacing(2)};
`;

export const Loader = styled.div`
  width: 100%;
  text-align: center;
  padding: ${theme.spacing(7, 0)};
`;
