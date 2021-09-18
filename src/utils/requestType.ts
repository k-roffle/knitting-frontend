export const DEFAULT_LIST_LENGTH = 10;

export type Meta = {
  last_cursor?: string;
};

export type ListResponse<T> = { payload: T[]; meta: Meta };
export type ObjectResponse<T> = { payload: T; meta: Meta };
