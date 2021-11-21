import { Input as OriginalInput, InputProps } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const Input = styled(OriginalInput)`
  margin: 0 0 16px 16px;
`;

export default {
  title: 'Input',
  component: Input,
  parameters: {
    componentSubtitle: 'Mui Input입니다.',
  },
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['text', 'number', 'password', 'search'],
      },
    },
    color: {
      control: {
        type: 'select',
        options: ['primary', 'secondary'],
      },
    },
  },
};

export const Basic = (args: InputProps): React.ReactElement => (
  <Input {...args} />
);

Basic.args = {
  placeholder: 'placeholder',
  defaultValue: 'value',
  endAdornment: 'cm',
  readOnly: false,
  disabled: false,
  draggable: false,
  error: false,
};

export const All = (): React.ReactElement => (
  <>
    <Input placeholder="default" />
    <Input placeholder="number" type="number" />
    <Input placeholder="password" type="password" />
    <Input placeholder="search" type="search" />
    <Input placeholder="search" type="search" />
  </>
);

export const Color = (): React.ReactElement => (
  <>
    <Input placeholder="default" />
    <Input placeholder="primary" color="primary" />
    <Input placeholder="secondary" color="secondary" />
  </>
);

export const Layout = (): React.ReactElement => (
  <>
    <Input placeholder="default" />
    <Input placeholder="fullWidth" fullWidth />
  </>
);
