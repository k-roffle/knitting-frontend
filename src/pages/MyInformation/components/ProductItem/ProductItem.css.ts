import styled from '@emotion/styled';
import { Box, css, Typography } from '@mui/material';

export const ProductRepresentImage = styled.img`
  border-radius: ${({ theme }) => theme.spacing(1.25)};
`;

export const Tag = styled(Box)`
  ${({ theme }) =>
    css`
      width: ${theme.spacing(10)};
      height: ${theme.spacing(3.75)};
      background: ${theme.palette.grey[100]};
      border-radius: ${theme.spacing(0.625)};
      font-size: ${theme.spacing(1.5)};
      & + & {
        margin-left: ${theme.spacing(1.25)};
      }
    `}
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
`;

export const DiscountRate = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: 700;
  font-size: 20px;
`;

export const Price = styled(Typography)`
  font-weight: 700;
  ${({ theme }) =>
    css`
      font-size: ${theme.spacing(3.125)};
      margin-left: ${theme.spacing(2.375)};
    `}
`;

export const Period = styled(Typography)`
  ${({ theme }) =>
    css`
      font-size: ${theme.spacing(1.75)};
      color: ${theme.palette.grey[600]};
    `}
`;
