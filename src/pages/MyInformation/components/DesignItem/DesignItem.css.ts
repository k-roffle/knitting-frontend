import { palette } from 'knitting/themes/palette';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button, ListItemButton, Typography, Checkbox } from '@mui/material';

export const StyledListItemButton = styled(ListItemButton)`
  padding: ${({ theme }) => theme.spacing(3)};
  display: block;
`;

export const ListItemContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const ImageWrapper = styled.div`
  ${({ theme }) => css`
    width: ${theme.spacing(33.75)};
    height: ${theme.spacing(25)};
    border-radius: ${theme.spacing(1.25)};
    box-shadow: ${theme.spacing(0.5)} ${theme.spacing(0.5)}
      ${theme.palette.grey[200]};
  `}
  overflow: hidden;
`;

export const Content = styled.div`
  margin-left: ${({ theme }) => theme.spacing(3.75)};
`;

export const Name = styled(Typography)`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacing(0.375)};
    font-size: ${theme.spacing(3.5)};
    width: ${theme.spacing(76.25)};
  `}
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DesignType = styled.span`
  display: inline-block;
  color: ${palette.grey[800]};
  background-color: rgba(0, 0, 0, 0.06);
  ${({ theme }) => css`
    padding: ${theme.spacing(0.5, 1)};
    border-radius: ${theme.spacing(0.5)};
    margin-right: ${theme.spacing(1)};
  `};
  font-size: 14px;
`;

export const Price = styled.span`
  display: flex;
  justify-content: flex-end;
  font-weight: 700;
  font-size: 24px;
`;

export const Information = styled(Typography)`
  font-weight: 400;
  color: ${palette.grey[800]};
  ${({ theme }) => css`
    margin-top: ${theme.spacing(0.75)};
  `}
`;

export const CreatedDate = styled(Typography)`
  display: block;
  ${({ theme }) => css`
    margin-top: 1px;
    font-size: ${theme.spacing(1.75)};
    color: ${theme.palette.grey[600]};
  `}
`;

export const ThumbNail = styled.img`
  position: relative;
  top: 50%;
  left: 50%;
  width: 100%;
  height: auto;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

export const Divider = styled.div`
  margin: ${({ theme }) => theme.spacing(3, -3, -3)};
  height: 1px;
  background-color: ${palette.grey[300]};
`;

export const StyledCheckBox = styled(Checkbox)`
  ${({ theme }) => css`
    width: ${theme.spacing(3.5)};
    height: ${theme.spacing(3.5)};
    padding-right: ${theme.spacing(2)};
  `};

  &:hover {
    background-color: transparent;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Menu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export const HamburgerMenu = styled(Button)`
  color: ${({ theme }) => theme.palette.grey[600]};

  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;
