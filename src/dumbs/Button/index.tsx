import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button as MaterialButton } from '@mui/material';
import React from 'react';

export const SIDE = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
} as const;

export type SIDE_TYPE = typeof SIDE[keyof typeof SIDE];

export interface Props {
  side?: SIDE_TYPE;
  label: string;
  onClick?(): void;
  disabled?: boolean;
  fullWidth?: boolean;
}

const StyledButton = styled(MaterialButton)<Pick<Props, 'side'>>`
  ${({ side }) =>
    side != null &&
    css`
      float: ${side.toLowerCase()};
    `};
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
