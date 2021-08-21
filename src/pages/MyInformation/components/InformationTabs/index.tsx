import { List, Tab, Tabs } from '@material-ui/core';
import { useCommonSnackbar } from 'components/CommonSnackbar/useCommonSnackbar';
import EmptyContent from 'dumbs/EmptyContent';
import { useGetMyDesigns } from 'pages/MyInformation/hooks/useGetMyDesigns';
import {
  selectedTabAtom,
  tabItemLengthAtom,
} from 'pages/MyInformation/recoils';
import { DESIGN_MENU_TYPE, DESIGN_MENU } from 'pages/MyInformation/types';
import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { theme } from 'themes';
import { FAILED_TO_GET_MY_DESIGNS } from 'utils/errors';
import { DEFAULT_LIST_LENGTH } from 'utils/requestType';

import DesignItem from '../DesignItem';
import InformationTabPanel from '../InformationTabPanel';

import { useRenderEmptyContent } from './useRenderEmptyContent';

const StyledList = styled(List)`
  margin-top: ${theme.spacing(2)};
`;

const MyInformationTabs = (): React.ReactElement => {
  const [selectedTab, setSelectedTab] = useRecoilState(selectedTabAtom);
  const { data, error } = useGetMyDesigns();

  useCommonSnackbar({
    message: FAILED_TO_GET_MY_DESIGNS,
    severity: 'error',
    dependencies: [error],
  });

  const designs = data?.payload ?? [];
  const isLoading = data == null;
  const isEmpty = !isLoading && designs.length === 0;

  const setTabItemLength = useSetRecoilState(tabItemLengthAtom);

  const emptyContent = useRenderEmptyContent();

  const handleChange = (
    _event: React.ChangeEvent<Record<string, never>>,
    newValue: DESIGN_MENU_TYPE,
  ) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    setTabItemLength(designs.length);
  }, [designs]);

  return (
    <div>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab value={DESIGN_MENU.CREATED_DESIGN} label="내가 만든 도안" />
        <Tab
          value={DESIGN_MENU.DESIGN_ON_SALE}
          label="판매 중인 상품"
          disabled
        />
        <Tab
          value={DESIGN_MENU.PURCHASED_DESIGN}
          label="구매한 상품"
          disabled
        />
      </Tabs>
      <InformationTabPanel value={DESIGN_MENU.CREATED_DESIGN}>
        <StyledList>
          {(isLoading ? [...Array(DEFAULT_LIST_LENGTH)] : designs).map(
            (design, index) => (
              <DesignItem
                isLoading={data == null}
                key={isLoading ? index : design.id}
                {...design}
                showDivider={designs.length - 1 !== index}
              />
            ),
          )}
          {isEmpty && emptyContent != null && (
            <EmptyContent {...emptyContent} />
          )}
        </StyledList>
      </InformationTabPanel>
      <InformationTabPanel value={DESIGN_MENU.DESIGN_ON_SALE}>
        판매 중인 도안 리스트
      </InformationTabPanel>
      <InformationTabPanel value={DESIGN_MENU.PURCHASED_DESIGN}>
        구매한 도안 리스트
      </InformationTabPanel>
    </div>
  );
};

export default MyInformationTabs;
