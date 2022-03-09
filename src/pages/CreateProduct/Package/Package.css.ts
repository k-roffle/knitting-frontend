import styled from '@emotion/styled';
import { Close } from '@mui/icons-material';
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

export const ImageWrapper = styled(Grid)`
  margin: ${({ theme }) => theme.spacing(-1)};
`;

export const ImageItem = styled(Grid)`
  margin: ${({ theme }) => theme.spacing(1)};
  position: relative;
`;

export const CloseButton = styled(Close)`
  position: absolute;
  ${({ theme }) => css`
    top: ${theme.spacing(1)};
    right: ${theme.spacing(1)};
  `}
`;

export const ImageUploader = styled.button`
  ${({ theme }) => css`
    margin: ${theme.spacing(1)};
    border-radius: ${theme.spacing(5)};
    border: ${theme.spacing(0.25)} solid ${theme.palette.grey[200]};
    width: ${theme.spacing(20)};
    height: ${theme.spacing(20)};
  `}
  background: none;
  color: inherit;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

export const ImagePreview = styled.img`
  ${({ theme }) => css`
    border-radius: ${theme.spacing(5)};
    width: ${theme.spacing(20)};
  `}
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
