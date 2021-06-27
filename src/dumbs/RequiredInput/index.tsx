import { Input, Typography } from '@material-ui/core';
import { InputBaseComponentProps } from '@material-ui/core/InputBase';
import { Variant } from '@material-ui/core/styles/createTypography';
import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from 'themes';
import { palette } from 'themes/palette';

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

const Required = styled(Typography)`
  display: inline;
  font-weight: normal;
  color: ${palette.primary.main};
`;

export const FormLabel = styled(Typography)`
  width: 100%;
  padding: ${theme.spacing(1)};
`;

const FullWithInput = styled(Input)<{ type?: string }>`
  width: 100%;

  ${({ type }) =>
    type === 'number' &&
    css`
      input {
        text-align: right;
      }
    `}
`;

export const RequiredMark = (): React.ReactElement => (
  <Required variant="h4"> *</Required>
);

const RequiredInput = ({
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
    <>
      <FormLabel variant={variant}>
        {label}
        <RequiredMark />
      </FormLabel>
      <FullWithInput
        id={id}
        type={type}
        aria-describedby={id}
        placeholder={placeholder}
        endAdornment={endAdornment}
        value={value}
        onChange={onChange}
        required
      />
    </>
  );
};

export default RequiredInput;
