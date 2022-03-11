import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Icon = styled.div`
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  ${({ theme }) => css`
    background-color: ${theme.palette.primary.main};
    color: ${theme.palette.common.white};
    width: ${theme.spacing(2.5)};
    height: ${theme.spacing(2.5)};
    font-size: ${theme.spacing(1.5)};
  `}
`;
