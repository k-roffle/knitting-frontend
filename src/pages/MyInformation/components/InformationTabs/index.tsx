import { selectedTabAtom } from 'knitting/pages/MyInformation/atom';
import {
  DESIGN_MENU_TYPE,
  DESIGN_MENU,
} from 'knitting/pages/MyInformation/types';

import { Tab, Tabs } from '@mui/material';
import React from 'react';
import { useRecoilState } from 'recoil';

import Designs from '../Designs';
import InformationTabPanel from '../InformationTabPanel';
import Products from '../Products';

const MyInformationTabs = (): React.ReactElement => {
  const [selectedTab, setSelectedTab] = useRecoilState(selectedTabAtom);

  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: DESIGN_MENU_TYPE,
  ) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab value={DESIGN_MENU.CREATED_DESIGN} label="내가 만든 도안" />
        <Tab value={DESIGN_MENU.PRODUCT_ON_SALE} label="판매 중인 상품" />
        <Tab
          value={DESIGN_MENU.PURCHASED_DESIGN}
          label="구매한 상품"
          disabled
        />
      </Tabs>
      <InformationTabPanel value={DESIGN_MENU.CREATED_DESIGN}>
        <Designs />
      </InformationTabPanel>
      <InformationTabPanel value={DESIGN_MENU.PRODUCT_ON_SALE}>
        <Products />
      </InformationTabPanel>
      <InformationTabPanel value={DESIGN_MENU.PURCHASED_DESIGN}>
        구매한 도안 리스트
      </InformationTabPanel>
    </div>
  );
};

export default MyInformationTabs;
