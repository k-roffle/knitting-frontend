import { SWRInfiniteResponse, useSWRInfinite } from 'swr';
import { DEFAULT_LIST_LENGTH, ListResponse } from 'utils/requestType';
import { request } from 'utils/requests';

import { DesignItemResponse } from './types';

type VendorQueryResult = ListResponse<DesignItemResponse>;

const getMyDesigns = async (pathname: string): Promise<VendorQueryResult> => {
  const { data } = await request({
    pathname,
    method: 'get',
    useCurrentToken: true,
  });

  return data;
};

export const useGetMyDesigns = (): SWRInfiniteResponse<
  VendorQueryResult,
  ListResponse<DesignItemResponse>
> => {
  function getKey(
    pageIndex: number,
    previousPageData: VendorQueryResult | null,
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

  const response = useSWRInfinite(getKey, (pathname: string) =>
    getMyDesigns(pathname),
  );

  return response;
};
