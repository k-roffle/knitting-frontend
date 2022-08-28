import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Input, InputBaseComponentProps, Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import React from 'react';

import { checkInvalid } from '../../pages/EditDesign/utils';

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
  showValidation?: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
}

const Required = styled(Typography)`
  display: inline;
  font-weight: normal;
  color: ${({ theme }) => theme.palette.primary.main};
`;

export const FormLabel = styled(Typography)`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(1)};
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
  <Required variant="body1"> *</Required>
);

const InputWithLabel = ({
  id,
  label,
  value,
  variant,
  inputProps = { min: 1 },
  isRequired = false,
  showValidation = false,
  ...other
}: Props): React.ReactElement => {
  const isInvalid = (): boolean => {
    if (!isRequired && typeof value === 'string') {
      return false;
    }
    return checkInvalid(value);
  };

  return (
    <>
      <FormLabel variant={variant}>
        {label}
        {isRequired && <RequiredMark />}
      </FormLabel>
      <FullWithInput
        id={id}
        value={value}
        aria-describedby={id}
        required={isRequired}
        inputProps={inputProps}
        error={showValidation && isInvalid()}
        {...other}
      />
    </>
  );
};

export default InputWithLabel;
