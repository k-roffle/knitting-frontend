import { List, Tab, Tabs } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { theme } from 'themes';
import { v4 as uuidv4 } from 'uuid';

import DesignItem from '../DesignItem';
import InformationTabPanel from '../InformationTabPanel';

const Mock = [
  {
    id: uuidv4(),
    name: '토니 캔디 라운드넥 니트',
    yarn: '패션아란 400g 1볼',
    tags: ['니트', '서술형 도안'],
  },
  {
    id: uuidv4(),
    name: '토니 캔디 라운드넥 니트',
    yarn: '패션아란 400g 1볼',
    tags: ['니트', '서술형 도안'],
  },
  {
    id: uuidv4(),
    name: '토니 캔디 라운드넥 니트',
    yarn: '패션아란 400g 1볼',
    tags: ['니트', '서술형 도안'],
  },
];

export const DESIGN_MENU = {
  CREATED_DESIGN: 'created_design',
  DESIGN_ON_SALE: 'design_on_sale',
  PURCHASED_DESIGN: 'purchased_design',
} as const;

export type DESIGN_MENU_TYPE = typeof DESIGN_MENU[keyof typeof DESIGN_MENU];

const StyledList = styled(List)`
  margin-top: ${theme.spacing(2)};
`;

const MyInformationTabs = (): React.ReactElement => {
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
      <InformationTabPanel
        selectedValue={value}
        value={DESIGN_MENU.CREATED_DESIGN}
      >
        <StyledList>
          {Mock.map((data, index) => (
            <DesignItem
              key={data.id}
              {...data}
              showDivider={Mock.length - 1 !== index}
            />
          ))}
        </StyledList>
      </InformationTabPanel>
      <InformationTabPanel
        selectedValue={value}
        value={DESIGN_MENU.DESIGN_ON_SALE}
      >
        판매 중인 도안 리스트
      </InformationTabPanel>
      <InformationTabPanel
        selectedValue={value}
        value={DESIGN_MENU.PURCHASED_DESIGN}
      >
        구매한 도안 리스트
      </InformationTabPanel>
    </div>
  );
};

export default MyInformationTabs;
