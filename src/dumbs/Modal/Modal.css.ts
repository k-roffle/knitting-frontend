import styled from '@emotion/styled';
import { Box, css, Modal } from '@mui/material';

import Button from '../Button';

export const ModalContainer = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBox = styled(Box)`
  ${({ theme }) => css`
    width: ${theme.spacing(71.25)};
    height: ${theme.spacing(30)};
    border-radius: ${theme.spacing(2.5)};
  `}
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`;

export const ModalContents = styled.div`
  text-align: center;
`;

export const ModalButton = styled(Button)`
  width: ${({ theme }) => theme.spacing(21.25)};

  :last-of-type {
    margin-left: ${({ theme }) => theme.spacing(3.75)};
  }
`;
