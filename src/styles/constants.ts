import { Typography } from '@material-ui/core';
import { theme } from 'knitting/themes';
import styled, { css } from 'styled-components';

export const flexCenterAlign = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const flexVerticalAlign = css`
  display: flex;
  align-items: center;
`;

export const defaultShadow = theme.shadows[8];

export const Title = styled(Typography)`
  margin-bottom: ${theme.spacing(2)};
  font-weight: 600;
`;

export const Contents = styled(Typography)`
  white-space: pre-line;
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${theme.spacing(6, 0, 4)};
`;
