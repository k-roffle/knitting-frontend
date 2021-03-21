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

const StyledButton = styled(MaterialButton)<Pick<Props, 'side'>>`
  float: ${({ side }) => side};
`;

const Button = ({ label, ...other }: Props): React.ReactElement => {
  return (
    <StyledButton color="primary" variant="contained" {...other}>
      {label}
    </StyledButton>
  );
};

export default Button;
