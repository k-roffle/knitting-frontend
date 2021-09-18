import { SWRInfiniteResponse, useSWRInfinite } from 'swr';
import { DEFAULT_LIST_LENGTH, ListResponse } from 'utils/requestType';
import { getData } from 'utils/requests';

import { DesignItemResponse } from './types';

type MyDesignsQueryResult = ListResponse<DesignItemResponse>;

export const useGetMyDesigns = (): SWRInfiniteResponse<MyDesignsQueryResult> => {
  function getKey(
    pageIndex: number,
    previousPageData: MyDesignsQueryResult | null,
  ) {
    const isLastCursor = previousPageData && !previousPageData.payload;

    if (isLastCursor) {
      return null;
    }

    const isFirstCursor = pageIndex === 0;
    const lastCursor = previousPageData?.meta?.last_cursor;

    let afterValue = '';

    if (!isFirstCursor && lastCursor != null) {
      afterValue = `&after=${lastCursor}`;
    }

    return `designs/my?count=${DEFAULT_LIST_LENGTH}${afterValue}`;
  }

  const response = useSWRInfinite(getKey, getData);

  return response;
};
