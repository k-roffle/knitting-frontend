import { Button as MaterialButton } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

export const SIDE = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
} as const;

export type SIDE_TYPE = typeof SIDE[keyof typeof SIDE];

export interface Props {
  side: SIDE_TYPE;
  label: string;
  onClick?(): void;
}

const Button = ({ side, label, onClick }: Props): React.ReactElement => {
  const StyledButton = styled(MaterialButton)`
    background: #e0562e;
    border-radius: 5;
    color: white;
    float: ${side};
    &:hover {
      background: #c8542a;
    }
  `;

  return (
    <StyledButton variant="contained" onClick={onClick}>
      {label}
    </StyledButton>
  );
};

export default Button;
