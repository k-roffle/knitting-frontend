import {
  Grid,
  Input as BaseInput,
  InputProps,
  Typography,
} from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from 'themes';

interface InlineInputProps extends InputProps {
  label: string;
  variant?: Variant | 'inherit';
}

export const FormLabel = styled(Typography)`
  width: 100%;
  padding: ${theme.spacing(1)};
  display: inline;
`;

const InputGrid = styled(Grid)`
  width: auto;
`;

const Input = styled(BaseInput)<{ type?: string }>`
  ${({ type }) =>
    type === 'number' &&
    css`
      input {
        text-align: right;
      }
    `}
`;

const InlineInput = (props: InlineInputProps): React.ReactElement => {
  return (
    <InputGrid container item alignItems="center">
      <Grid item>
        <FormLabel variant={props.variant}>{props.label}</FormLabel>
      </Grid>
      <Grid item>
        <Input {...props} aria-describedby={props.id} required />
      </Grid>
    </InputGrid>
  );
};

export default InlineInput;
