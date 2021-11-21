import { MenuItem, Select as OriginalSelect, SelectProps } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const Select = styled(OriginalSelect)`
  margin: 0 0 16px 16px;
`;

export default {
  title: 'Select',
  component: Select,
  parameters: {
    componentSubtitle: 'Mui Select입니다.',
  },
};

const items = ['Ten', 'Twenty', 'Thirty'];
const renderMenuItems = items.map((item, index) => (
  <MenuItem value={index}>{item}</MenuItem>
));

export const Basic = (args: SelectProps): React.ReactElement => (
  <Select {...args}>{renderMenuItems}</Select>
);

Basic.args = {
  defaultValue: 0,
  readOnly: false,
  disabled: false,
  draggable: false,
  error: false,
};

export const All = (): React.ReactElement => (
  <>
    <Select>{renderMenuItems}</Select>
    <Select defaultValue={0}>{renderMenuItems}</Select>
    <Select defaultValue={0} autoWidth>
      {renderMenuItems}
    </Select>
    <Select defaultValue={0} renderValue={(value) => `⚠️  - ${value}`}>
      {renderMenuItems}
    </Select>
  </>
);

export const Color = (): React.ReactElement => (
  <>
    <Select defaultValue={0}>{renderMenuItems}</Select>
    <Select defaultValue={0} color="primary">
      {renderMenuItems}
    </Select>
    <Select defaultValue={0} color="secondary">
      {renderMenuItems}
    </Select>
  </>
);

export const Layout = (): React.ReactElement => (
  <>
    <Select defaultValue={0}>{renderMenuItems}</Select>
    <Select defaultValue={0} fullWidth>
      {renderMenuItems}
    </Select>
  </>
);
