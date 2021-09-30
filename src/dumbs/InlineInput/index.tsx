import { Grid, Input, Typography } from '@material-ui/core';
import { InputBaseComponentProps } from '@material-ui/core/InputBase';
import { Variant } from '@material-ui/core/styles/createTypography';
import React from 'react';
import styled from 'styled-components';
import { theme } from 'themes';

interface Props {
  id: string;
  type?: string;
  label: string;
  variant?: Variant | 'inherit';
  value?: string | number;
  placeholder?: string;
  endAdornment?: React.ReactNode;
  inputProps?: InputBaseComponentProps;
  onChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
}

export const FormLabel = styled(Typography)`
  width: 100%;
  padding: ${theme.spacing(1)};
  display: inline;
`;

const InputGrid = styled(Grid)`
  width: auto;
`;

const InlineInput = ({
  id,
  type,
  label,
  variant,
  value,
  placeholder,
  endAdornment,
  onChange,
}: Props): React.ReactElement => {
  return (
    <InputGrid container item alignItems={'center'}>
      <Grid item>
        <FormLabel variant={variant}>{label}</FormLabel>
      </Grid>
      <Grid item>
        <Input
          id={id}
          type={type}
          aria-describedby={id}
          placeholder={placeholder}
          endAdornment={endAdornment}
          value={value}
          onChange={onChange}
          required
        />
      </Grid>
    </InputGrid>
  );
};

export default InlineInput;
