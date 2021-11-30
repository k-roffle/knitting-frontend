import styled from '@emotion/styled';
import { flexVerticalAlign } from 'knitting/styles/constants';

export const LevelLabel = styled.div`
  ${flexVerticalAlign}

  span {
    margin-right: ${({ theme }) => theme.spacing(1.5)};
  }

  h6 {
    font-weight: 400;
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`;
