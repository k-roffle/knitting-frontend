import { Typography } from '@material-ui/core';
import EmptyContent from 'dumbs/EmptyContent';
import DesignItem from 'pages/MyInformation/components/DesignItem';
import { useMyDesigns } from 'pages/MyInformation/hooks/useMyDesigns';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { DEFAULT_LIST_LENGTH } from 'utils/requestType';

import { currentProductInputAtom } from '../recoils';

import { Loader, StyledList } from './SelectDesigns.css';

const SelectDesigns = (): React.ReactElement => {
  const { isLoading, hasLastCursor, designs, loadMore } = useMyDesigns();
  const history = useHistory();

  const [currentProductInput, setCurrentProductInput] = useRecoilState(
    currentProductInputAtom,
  );
  const { designIds } = currentProductInput;

  const isEmpty = !isLoading && designs.length === 0;

  const handleSelectDesign = (id: number) => (): void => {
    let newDesignIds;

    if (designIds.find((designId) => designId === id)) {
      newDesignIds = designIds.filter((designId) => designId !== id);
    } else {
      newDesignIds = designIds.concat(id);
    }

    setCurrentProductInput({ ...currentProductInput, designIds: newDesignIds });
  };

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
            const isChecked = designIds.some(
              (designId) => designId === design?.id,
            );

            return (
              <DesignItem
                showCheckBox
                isLoading={isLoading}
                key={index}
                {...design}
                showDivider={showDivider}
                checked={isChecked}
                onClick={handleSelectDesign(design?.id)}
              />
            );
          },
        )}
      </InfiniteScroll>
      {isEmpty && (
        <EmptyContent
          title="아직 만든 도안이 없어요! 😢"
          description={
            <>
              니팅에서 등록된 도안만 판매할 수 있어요! <br />
              도안 먼저 만들고 올까요? 🏃‍♀️
            </>
          }
          buttonText="빠르게 도안 만들고 오기"
          onClick={() => history.push('/my/designs/create')}
        />
      )}
    </StyledList>
  );
};

export default SelectDesigns;
