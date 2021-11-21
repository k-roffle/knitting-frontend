import { Input, InputBaseComponentProps, Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
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
  isRequired?: boolean;
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

const InputWithLabel = ({
  id,
  label,
  variant,
  inputProps = { min: 1 },
  isRequired = false,
  ...other
}: Props): React.ReactElement => {
  return (
    <>
      <FormLabel variant={variant}>
        {label}
        {isRequired && <RequiredMark />}
      </FormLabel>
      <FullWithInput
        id={id}
        aria-describedby={id}
        required={isRequired}
        inputProps={inputProps}
        {...other}
      />
    </>
  );
};

export default InputWithLabel;
