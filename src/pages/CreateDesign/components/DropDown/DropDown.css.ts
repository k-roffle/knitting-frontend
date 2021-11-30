import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MenuList } from '@mui/material';

export const DropDownWrapper = styled.div`
  height: ${({ theme }) => theme.spacing(4)};
`;

export const SelectedButton = styled.button`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(0.5, 1, 0.5, 1.5)};
`;

export const OptionWrapper = styled(MenuList)`
  overflow-y: scroll;
  ${({ theme }) =>
    css`
      background: ${theme.palette.background.paper};
      max-height: ${theme.spacing(27)};
      border-radius: ${theme.spacing(0.5)};
      box-shadow: ${theme.shadows[8]};
    `}
`;
