import { List } from '@material-ui/core';
import { useCommonSnackbar } from 'components/CommonSnackbar/useCommonSnackbar';
import EmptyContent from 'dumbs/EmptyContent';
import { useGetMyDesigns } from 'pages/MyInformation/hooks/useGetMyDesigns';
import { tabItemLengthAtom } from 'pages/MyInformation/recoils';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { theme } from 'themes';
import { FAILED_TO_GET_MY_DESIGNS } from 'utils/errors';
import { DEFAULT_LIST_LENGTH } from 'utils/requestType';

import DesignItem from '../DesignItem';
import { useRenderEmptyContent } from '../InformationTabs/useRenderEmptyContent';

const Designs = (): React.ReactElement => {
  const { data, error } = useGetMyDesigns();
  const setTabItemLength = useSetRecoilState(tabItemLengthAtom);
  const emptyContent = useRenderEmptyContent();

  useCommonSnackbar({
    message: FAILED_TO_GET_MY_DESIGNS,
    severity: 'error',
    dependencies: [error],
  });

  const designs = data?.payload ?? [];
  const isLoading = data == null;
  const isEmpty = !isLoading && designs.length === 0;

  useEffect(() => {
    setTabItemLength(designs.length);
  }, [designs]);

  return (
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
      {isEmpty && emptyContent != null && <EmptyContent {...emptyContent} />}
    </StyledList>
  );
};

export default Designs;

const StyledList = styled(List)`
  margin-top: ${theme.spacing(2)};
`;
