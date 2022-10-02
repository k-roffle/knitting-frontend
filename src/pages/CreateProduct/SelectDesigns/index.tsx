import EmptyContent from 'knitting/dumbs/EmptyContent';
import DesignItem from 'knitting/pages/MyInformation/components/DesignItem';
import { DesignItemResponse } from 'knitting/pages/MyInformation/hooks/types';
import { useMyDesigns } from 'knitting/pages/MyInformation/hooks/useMyDesigns';
import { DEFAULT_LIST_LENGTH } from 'knitting/utils/requestType';

import { Typography } from '@mui/material';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { currentProductInputAtom } from '../atom';

import { Loader, StyledList } from './SelectDesigns.css';

const SelectDesigns = (): React.ReactElement => {
  const {
    isLoading,
    hasLastCursor,
    designs: myDesigns,
    loadMore,
  } = useMyDesigns();
  const navigate = useNavigate();

  const [currentProductInput, setCurrentProductInput] = useRecoilState(
    currentProductInputAtom,
  );
  const { designs, designIds } = currentProductInput;

  const isEmpty = !isLoading && myDesigns.length === 0;

  const handleSelectDesign = (design: DesignItemResponse) => (): void => {
    const newDesigns = designIds.includes(design.id)
      ? designs.filter(({ id }) => id !== design.id)
      : [...designs, design];

    setCurrentProductInput({
      ...currentProductInput,
      designs: newDesigns,
      designIds: newDesigns.map((newDesign) => newDesign.id),
      fullPrice: newDesigns
        .map((newDesign) => newDesign.price)
        .reduce((prev, curr) => prev + curr, 0),
    });
  };

  return (
    <StyledList>
      <InfiniteScroll
        dataLength={myDesigns.length}
        next={loadMore}
        hasMore={hasLastCursor}
        loader={
          <Loader>
            <Typography variant="h5">도안 더 가져오는 중 🏃‍♂️</Typography>
          </Loader>
        }
      >
        {(isLoading ? [...Array(DEFAULT_LIST_LENGTH)] : myDesigns).map(
          (design, index) => {
            const showDivider = myDesigns.length - 1 !== index;
            const isChecked = designIds.includes(design.id);

            return (
              <DesignItem
                showCheckBox
                isLoading={isLoading}
                key={index}
                {...design}
                showDivider={showDivider}
                checked={isChecked}
                onClick={handleSelectDesign(design)}
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
          onClick={() => navigate('/my/designs/create')}
        />
      )}
    </StyledList>
  );
};

export default SelectDesigns;
