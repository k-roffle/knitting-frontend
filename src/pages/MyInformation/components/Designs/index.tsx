import { FAILED_TO_GET_MY_DESIGNS } from 'constants/errors';

import { List, Typography } from '@material-ui/core';
import { useCommonSnackbar } from 'components/CommonSnackbar/useCommonSnackbar';
import EmptyContent from 'dumbs/EmptyContent';
import { useGetMyDesigns } from 'pages/MyInformation/hooks/useGetMyDesigns';
import { tabItemLengthAtom } from 'pages/MyInformation/recoils';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { theme } from 'themes';
import { DEFAULT_LIST_LENGTH } from 'utils/requestType';

import { DesignItemResponse } from '../../hooks/types';
import DesignItem from '../DesignItem';
import { useRenderEmptyContent } from '../InformationTabs/useRenderEmptyContent';

const Designs = (): React.ReactElement => {
  const { data, error, size, setSize } = useGetMyDesigns();
  const setTabItemLength = useSetRecoilState(tabItemLengthAtom);
  const emptyContent = useRenderEmptyContent();

  useCommonSnackbar({
    message: FAILED_TO_GET_MY_DESIGNS,
    severity: 'error',
    dependencies: [error],
  });

  const getResponseDesigns = () =>
    data?.reduce(
      (designs: DesignItemResponse[], { payload }) => designs.concat(payload),
      [],
    );
  const isLoading = data == null;
  const designs = isLoading
    ? [...Array(DEFAULT_LIST_LENGTH)]
    : getResponseDesigns() ?? [];
  const isEmpty = !isLoading && designs.length === 0;
  const lastData = data?.[data.length - 1];
  const hasLastCursor =
    (lastData?.payload ?? []).length > 0 && lastData?.meta.last_cursor != null;

  useEffect(() => {
    setTabItemLength(designs.length);
  }, [designs]);

  const getNextDesigns = (): void => {
    if (hasLastCursor) {
      setSize(size + 1);
    }
  };

  return (
    <StyledList>
      <InfiniteScroll
        dataLength={designs.length}
        next={getNextDesigns}
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
                isLoading={data == null}
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

const StyledList = styled(List)`
  margin-top: ${theme.spacing(2)};
`;

const Loader = styled.div`
  width: 100%;
  text-align: center;
  padding: ${theme.spacing(7, 0)};
`;
