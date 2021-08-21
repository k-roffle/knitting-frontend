import { SWRInfiniteResponse, useSWRInfinite } from 'swr';
import { getAccessToken } from 'utils/auth';
import { DEFAULT_LIST_LENGTH, ListResponse } from 'utils/requestType';
import { request } from 'utils/requests';

import { DesignItemResponse } from './types';

type VendorQueryResult = ListResponse<DesignItemResponse>;

const getMyDesigns = async (pathname: string): Promise<VendorQueryResult> => {
  const { data } = await request({
    pathname,
    method: 'get',
    accessToken: getAccessToken(),
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
    const afterValue =
      isFirstCursor || lastCursor == null ? `` : `&after=${lastCursor}`;

    return `designs/my?count=${DEFAULT_LIST_LENGTH}${afterValue}`;
  }

  const response = useSWRInfinite(getKey, (pathname: string) =>
    getMyDesigns(pathname),
  );

  return response;
};
