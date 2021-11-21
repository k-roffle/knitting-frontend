import { StepLabel } from '@mui/material';
import styled, { css } from 'styled-components';
import { palette } from 'themes/palette';
import { zIndex } from 'themes/zIndex';

export interface StepIconProps {
  active: boolean;
  completed: boolean;
}

export const StepIcon = styled.div<StepIconProps>`
  color: ${palette.grey[200]};
  display: flex;
  height: 22px;
  z-index: ${zIndex.mobileStepper};
  align-items: center;
  ${(props) =>
    props.active &&
    css`
      color: ${palette.primary.main};
    `};
  div {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: currentColor;

    ${(props) =>
      props.completed &&
      css`
        color: ${palette.primary.main};
        font-size: 18px;
      `};
  }
`;

export const StyledStepLabel = styled(StepLabel)`
  word-break: keep-all;
`;
