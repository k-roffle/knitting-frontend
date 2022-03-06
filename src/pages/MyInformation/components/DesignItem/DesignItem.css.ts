import { theme } from 'knitting/themes';
import { palette } from 'knitting/themes/palette';

import styled from '@emotion/styled';
import { ListItemButton, Typography, Checkbox } from '@mui/material';

export const StyledListItemButton = styled(ListItemButton)`
  padding: ${theme.spacing(3)};
  display: block;
`;

export const ListItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ImageWrapper = styled.div`
  width: ${theme.spacing(32)};
  height: ${theme.spacing(17)};
  margin-right: ${theme.spacing(2)};
  overflow: hidden;
`;

export const Content = styled.div`
  width: 100%;
`;

export const Name = styled(Typography)`
  margin-bottom: ${theme.spacing(1.5)};
`;

export const DesignType = styled.span`
  display: inline-block;
  color: ${palette.grey[800]};
  background-color: rgba(0, 0, 0, 0.06);
  padding: ${theme.spacing(0.5, 1)};
  border-radius: ${theme.spacing(0.5)};
  font-size: 14px;
  margin-right: ${theme.spacing(1)};
`;

export const Price = styled.span`
  display: flex;
  justify-content: flex-end;
  font-weight: 700;
  font-size: 24px;
`;

export const Information = styled(Typography)`
  color: ${palette.grey[800]};
  margin-bottom: ${theme.spacing(0.5)};
`;

export const CreatedDate = styled(Typography)`
  display: block;
  color: ${palette.text.secondary};
  margin-bottom: ${theme.spacing(2)};
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
  margin: ${theme.spacing(3, -3, -3)};
  height: 1px;
  background-color: ${palette.grey[300]};
`;

export const StyledCheckBox = styled(Checkbox)`
  width: ${theme.spacing(3.5)};
  height: ${theme.spacing(3.5)};
  padding-right: ${theme.spacing(2)};

  &:hover {
    background-color: transparent;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;
