import { Select } from '@material-ui/core';
import { InputBaseComponentProps } from '@material-ui/core/InputBase';
import { Variant } from '@material-ui/core/styles/createTypography';
import { FormLabel, RequiredMark } from 'dumbs';
import React from 'react';
import styled from 'styled-components';

interface Props {
  id: string;
  label: string;
  variant?: Variant | 'inherit';
  defaultValue?: unknown;
  value?: string | number;
  placeholder?: string;
  inputProps?: InputBaseComponentProps;
  children: React.ReactNode;
  onChange: (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode,
  ) => void;
}

const FullWithSelect = styled(Select)`
  width: 100%;
`;

const RequiredSelect = ({
  id,
  label,
  variant,
  defaultValue,
  value,
  placeholder,
  children,
  onChange,
}: Props): React.ReactElement => {
  return (
    <>
      <FormLabel variant={variant}>
        {label}
        <RequiredMark />
      </FormLabel>
      <FullWithSelect
        id={id}
        placeholder={placeholder}
        required
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
      >
        {children}
      </FullWithSelect>
    </>
  );
};

export default RequiredSelect;
