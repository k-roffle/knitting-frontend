import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Accordion } from '@mui/material';

export const StyledAccordion = styled(Accordion)`
  &::before {
    content: none;
  }
  ${({ theme }) => css`
    background-color: ${theme.palette.grey[200]};
    border-radius: ${theme.spacing(1)};
    &:last-of-type {
      border-radius: ${theme.spacing(1)};
    }
  `}
  display: inline-block;
  box-shadow: none;
`;
