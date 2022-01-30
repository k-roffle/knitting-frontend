export const isEmptyString = (value?: string): boolean =>
  value == null || value.trim().length === 0;

export const hasEmptyValue = (values: (string | undefined)[]): boolean =>
  values.some((value) => isEmptyString(value));

export const isNegativeNumber = (value?: number): boolean =>
  value == null || value < 1;

export const hasNegativeNumber = (values: number[]): boolean =>
  values.some((value) => isNegativeNumber(value));
