import { isEmptyString, isNegativeNumber } from 'knitting/utils/validation';

const NUMBER_FORMATTER = new Intl.NumberFormat('ko-KR', {
  maximumFractionDigits: 20,
});

export const formatNumber = (num: number | string): string =>
  NUMBER_FORMATTER.format(Number(num));

export const checkInvalid = (value: unknown): boolean => {
  if (typeof value === 'string') {
    return isEmptyString(value);
  } else if (typeof value === 'number') {
    return isNegativeNumber(value);
  }
  return false;
};
