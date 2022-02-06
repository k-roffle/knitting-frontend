import styled from '@emotion/styled';
import { css } from '@mui/material';
import { palette } from 'knitting/themes/palette';
import { zIndex } from 'knitting/themes/zIndex';
import React from 'react';

interface StepIconProps {
  active: boolean;
  completed: boolean;
}

const StepIcon = styled.div<StepIconProps>`
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

const renderStepIcon = (props: StepIconProps): React.ReactElement => {
  return (
    <StepIcon {...props}>
      <div />
    </StepIcon>
  );
};

export default renderStepIcon;
