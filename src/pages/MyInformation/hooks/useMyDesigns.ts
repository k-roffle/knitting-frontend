import { FAILED_TO_GET_MY_DESIGNS } from 'constants/errors';

import { useCommonSnackbar } from 'components/CommonSnackbar/useCommonSnackbar';
import { DEFAULT_LIST_LENGTH } from 'utils/requestType';

import { DesignItemResponse } from './types';
import { useGetMyDesigns } from './useGetMyDesigns';

type MyDesigns = {
  isLoading: boolean;
  hasLastCursor: boolean;
  designs: DesignItemResponse[];
  roadMore(): void;
};

export const useMyDesigns = (): MyDesigns => {
  const { data, error, size, setSize } = useGetMyDesigns();

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
  const lastData = data?.[data.length - 1];
  const hasLastCursor =
    (lastData?.payload ?? []).length > 0 && lastData?.meta.last_cursor != null;

  const roadMore = (): void => {
    if (hasLastCursor) {
      setSize(size + 1);
    }
  };

  return {
    isLoading,
    hasLastCursor,
    designs,
    roadMore,
  };
};
