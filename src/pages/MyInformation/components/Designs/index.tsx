import EmptyContent from 'knitting/dumbs/EmptyContent';
import { tabItemLengthAtom } from 'knitting/pages/MyInformation/atom';
import { DEFAULT_LIST_LENGTH } from 'knitting/utils/requestType';

import { Typography } from '@mui/material';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSetRecoilState } from 'recoil';

import { useMyDesigns } from '../../hooks/useMyDesigns';
import DesignItem from '../DesignItem';
import { useRenderEmptyContent } from '../InformationTabs/useRenderEmptyContent';

import { StyledList, Loader } from './Designs.css';

const Designs = (): React.ReactElement => {
  const { isLoading, hasLastCursor, designs, loadMore } = useMyDesigns();
  const emptyContent = useRenderEmptyContent();

  const setTabItemLength = useSetRecoilState(tabItemLengthAtom);

  const isEmpty = !isLoading && designs.length === 0;

  useEffect(() => {
    setTabItemLength(designs.length);
  }, [designs]);

  return (
    <StyledList>
      <InfiniteScroll
        dataLength={designs.length}
        next={loadMore}
        hasMore={hasLastCursor}
        loader={
          <Loader>
            <Typography variant="h5">도안 더 가져오는 중 🏃‍♂️</Typography>
          </Loader>
        }
      >
        {(isLoading ? [...Array(DEFAULT_LIST_LENGTH)] : designs).map(
          (design, index) => {
            const showDivider = designs.length - 1 !== index;

            return (
              <DesignItem
                isLoading={isLoading}
                key={index}
                {...design}
                showDivider={showDivider}
              />
            );
          },
        )}
      </InfiniteScroll>
      {isEmpty && emptyContent != null && <EmptyContent {...emptyContent} />}
    </StyledList>
  );
};

export default Designs;
