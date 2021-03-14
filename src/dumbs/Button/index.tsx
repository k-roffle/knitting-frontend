import { Button as MaterialButton } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

export interface Props {
  side: 'left' | 'right';
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
      background: #e0562e;
    }
  `;

  return (
    <StyledButton variant="contained" onClick={onClick}>
      {label}
    </StyledButton>
  );
};

export default Button;
