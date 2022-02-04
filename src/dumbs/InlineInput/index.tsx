import styled from '@emotion/styled';
import {
  InputProps,
  Input as BaseInput,
  Typography,
  Grid,
  css,
} from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { theme } from 'knitting/themes';
import React from 'react';

interface InlineInputProps extends InputProps {
  label: string;
  variant?: Variant | 'inherit';
  message?: string;
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
        {props.error && <FormHelperText error>{props.message}</FormHelperText>}
      </Grid>
    </InputGrid>
  );
};

export default InlineInput;
