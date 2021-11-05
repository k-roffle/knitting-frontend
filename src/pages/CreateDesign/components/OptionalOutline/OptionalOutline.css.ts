import { Grid, Input } from '@material-ui/core';
import styled from 'styled-components';
import { flexVerticalAlign } from 'styles/constants';
import { theme } from 'themes';
import { palette } from 'themes/palette';

export const LevelLabel = styled.div`
  ${flexVerticalAlign}

  span {
    margin-right: ${theme.spacing(1.5)};
  }

  h6 {
    font-weight: 400;
    color: ${palette.text.secondary};
  }
`;

export const FullWithInput = styled(Input)`
  width: 100%;
`;

export const Row = styled(Grid)`
  padding: ${theme.spacing(1.5)};
`;
