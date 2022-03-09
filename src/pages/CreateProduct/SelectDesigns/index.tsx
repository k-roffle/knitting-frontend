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

import { currentProductInputAtom } from '../recoils';

import { Loader, StyledList } from './SelectDesigns.css';

const SelectDesigns = (): React.ReactElement => {
  const { isLoading, hasLastCursor, designs, loadMore } = useMyDesigns();
  const navigate = useNavigate();

  const [currentProductInput, setCurrentProductInput] = useRecoilState(
    currentProductInputAtom,
  );
  const { designs: selectDesigns } = currentProductInput;

  const isEmpty = !isLoading && designs.length === 0;

  const handleSelectDesign = (design: DesignItemResponse) => (): void => {
    let newDesigns;

    if (selectDesigns.find(({ id }) => id === design.id)) {
      newDesigns = selectDesigns.filter(({ id }) => id !== design.id);
    } else {
      newDesigns = selectDesigns.concat(design);
    }

    setCurrentProductInput({
      ...currentProductInput,
      fullPrice: newDesigns
        .map((newDesign) => newDesign.price)
        .reduce((current, prev) => current + prev, 0),
      designs: newDesigns,
    });
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
            const isChecked = selectDesigns.some(({ id }) => id === design.id);

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
