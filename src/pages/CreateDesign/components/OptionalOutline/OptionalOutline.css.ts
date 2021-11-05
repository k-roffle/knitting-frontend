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
