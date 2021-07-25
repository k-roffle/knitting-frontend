import { Tab, Tabs } from '@material-ui/core';
import React from 'react';

import DesignTabPanel from '../DesignTabPanel';

export const DESIGN_MENU = {
  CREATED_DESIGN: 'created_design',
  DESIGN_ON_SALE: 'design_on_sale',
  PURCHASED_DESIGN: 'purchased_design',
} as const;

export type DESIGN_MENU_TYPE = typeof DESIGN_MENU[keyof typeof DESIGN_MENU];

const DesignTabs = (): React.ReactElement => {
  const [value, setValue] = React.useState<DESIGN_MENU_TYPE>(
    DESIGN_MENU.CREATED_DESIGN,
  );

  const handleChange = (
    _event: React.ChangeEvent<Record<string, never>>,
    newValue: DESIGN_MENU_TYPE,
  ) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab value={DESIGN_MENU.CREATED_DESIGN} label="내가 만든 도안" />
        <Tab
          value={DESIGN_MENU.DESIGN_ON_SALE}
          label="판매 중인 도안"
          disabled
        />
        <Tab
          value={DESIGN_MENU.PURCHASED_DESIGN}
          label="구매한 도안"
          disabled
        />
      </Tabs>
      <DesignTabPanel selectedValue={value} value={DESIGN_MENU.CREATED_DESIGN}>
        내가 만든 도안 리스트
      </DesignTabPanel>
      <DesignTabPanel selectedValue={value} value={DESIGN_MENU.DESIGN_ON_SALE}>
        판매 중인 도안 리스트
      </DesignTabPanel>
      <DesignTabPanel
        selectedValue={value}
        value={DESIGN_MENU.PURCHASED_DESIGN}
      >
        구매한 도안 리스트
      </DesignTabPanel>
    </div>
  );
};

export default DesignTabs;
