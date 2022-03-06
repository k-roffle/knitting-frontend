import { MutateOptions, QueryObserverOptions } from 'react-query';

export const DEFAULT_LIST_LENGTH = 10;

export type Meta = {
  last_cursor?: string;
};

export type ListResponse<T> = { payload: T[]; meta: Meta };
export type ObjectResponse<T> = { payload: T; meta: Meta };
type RequestParam = {
  pathname: string;
  errorMessage?: string;
  onError?: () => void;
  isError?: boolean;
  isLoading?: boolean;
};

export type MutateRequestParam<TData, TError, TVariables> = RequestParam & {
  onSuccess?: MutateOptions<TData, TError, TVariables>['onSuccess'];
};

export type QueryRequestParam<TData> = RequestParam & {
  onSuccess?: QueryObserverOptions<TData>['onSuccess'];
};
