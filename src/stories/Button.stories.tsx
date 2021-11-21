import { Button as OriginalButton, ButtonProps } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const Button = styled(OriginalButton)`
  margin-right: 16px;
`;

export default {
  title: 'Button',
  component: Button,
  parameters: {
    componentSubtitle: 'Mui Button입니다.',
  },
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['contained', 'outlined', 'text'],
      },
    },
    color: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'inherit', 'default'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
    },
  },
};

export const Basic = (args: ButtonProps): React.ReactElement => (
  <Button {...args} />
);

Basic.args = {
  children: 'Basic',
  variant: 'contained',
  color: 'primary',
  size: 'medium',
  disabled: false,
};

export const All = (): React.ReactElement => (
  <>
    <Button variant="contained">Default</Button>
    <Button variant="contained" color="primary">
      Primary
    </Button>
    <Button variant="contained" color="secondary">
      Secondary
    </Button>
    <Button variant="contained" disabled>
      Disabled
    </Button>
    <Button variant="contained" color="primary" href="#contained-buttons">
      Link
    </Button>
  </>
);

export const text = (): React.ReactElement => (
  <>
    <Button>Default</Button>
    <Button color="primary">Primary</Button>
    <Button color="secondary">Secondary</Button>
    <Button disabled>Disabled</Button>
    <Button href="#text-buttons" color="primary">
      Link
    </Button>
  </>
);

export const outlined = (): React.ReactElement => (
  <>
    <Button variant="outlined">Default</Button>
    <Button variant="outlined" color="primary">
      Primary
    </Button>
    <Button variant="outlined" color="secondary">
      Secondary
    </Button>
    <Button variant="outlined" disabled>
      Disabled
    </Button>
    <Button variant="outlined" color="primary" href="#outlined-buttons">
      Link
    </Button>
  </>
);

export const Sizes = (): React.ReactElement => (
  <>
    <Button color="primary" variant="contained" size="small">
      Small
    </Button>
    <Button color="primary" variant="contained">
      Medium
    </Button>
    <Button color="primary" variant="contained" size="large">
      Large
    </Button>
  </>
);
