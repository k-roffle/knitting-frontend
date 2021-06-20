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
  disabled?: boolean;
}

const StyledButton = styled(MaterialButton)<Pick<Props, 'side'>>`
  float: ${({ side }) => side.toLowerCase()};
`;

const Button = ({
  label,
  disabled = false,
  ...other
}: Props): React.ReactElement => {
  return (
    <StyledButton
      color="primary"
      variant="contained"
      disabled={disabled}
      {...other}
    >
      {label}
    </StyledButton>
  );
};

export default Button;
