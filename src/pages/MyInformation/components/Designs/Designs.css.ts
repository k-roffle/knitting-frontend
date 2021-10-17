import { List } from '@material-ui/core';
import styled from 'styled-components';
import { theme } from 'themes';

export const StyledList = styled(List)`
  margin-top: ${theme.spacing(2)};
`;

export const Loader = styled.div`
  width: 100%;
  text-align: center;
  padding: ${theme.spacing(7, 0)};
`;
