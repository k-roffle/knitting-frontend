import styled from '@emotion/styled';
import { Grid, Input, Typography, css } from '@mui/material';

export const Row = styled(Grid)`
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

export const FullWidthInput = styled(Input)`
  width: 100%;
`;

export const Rate = styled.span`
  ${({ theme }) => css`
    color: ${theme.palette.primary.main};
    margin-left: ${theme.spacing(2)};
    font-size: ${theme.spacing(1.75)};
  `}
`;

export const SalesDateInfo = styled(Typography)<{
  invalid?: boolean;
}>`
  ${({ theme, invalid }) => css`
    margin-top: ${theme.spacing(1)};
    color: ${invalid ? '#ff0000' : '#808080'};
  `}
`;

export const Wave = styled.span`
  margin: 0 ${({ theme }) => theme.spacing(1)};
`;

export const AccordionDetail = styled.div`
  display: flex;
`;

export const Name = styled(Typography)`
  width: ${({ theme }) => theme.spacing(25)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Price = styled(Typography)`
  margin-left: ${({ theme }) => theme.spacing(4)};
`;
