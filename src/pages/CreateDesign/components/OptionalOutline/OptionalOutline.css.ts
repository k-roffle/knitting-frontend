import styled from '@emotion/styled';
import { flexVerticalAlign } from 'knitting/styles/constants';
import { theme } from 'knitting/themes';
import { palette } from 'knitting/themes/palette';

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
