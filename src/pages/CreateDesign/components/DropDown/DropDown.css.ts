import { MenuList } from '@material-ui/core';
import { theme } from 'knitting/themes';
import { palette } from 'knitting/themes/palette';
import styled from 'styled-components';

export const DropDownWrapper = styled.div`
  height: ${theme.spacing(4)};
`;

export const SelectedButton = styled.button`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  align-items: center;
  padding: ${theme.spacing(0.5, 1, 0.5, 1.5)};
`;

export const OptionWrapper = styled(MenuList)`
  background: ${palette.background.paper};
  max-height: ${theme.spacing(27)};
  border-radius: ${theme.spacing(0.5)};
  box-shadow: ${theme.shadows[8]};
  overflow-y: scroll;
`;
