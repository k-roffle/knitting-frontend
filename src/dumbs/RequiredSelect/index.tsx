import {
  InputBaseComponentProps,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
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
  onChange: (event: SelectChangeEvent<unknown>, child: React.ReactNode) => void;
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
