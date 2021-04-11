const NUMBER_FORMATTER = new Intl.NumberFormat('ko-KR', {
  maximumFractionDigits: 20,
});

export const formatNumber = (num: number | string): string =>
  NUMBER_FORMATTER.format(Number(num));
