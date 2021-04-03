/* eslint-disable */
const numbers = '0-9';

export const getEndHashtagMatch = (unit: string) =>
  new RegExp(`^(?:[${numbers}]+[${unit}]|:\/\/)`);

export const getHashSigns = (unit: string) => new RegExp(unit);

export const getUnitDecoratorBoundary = (unit: string) =>
  new RegExp(
    `((?:^|$|[^${numbers}]))([${numbers}]*)([${numbers}]+[${unit}])`,
    'gi',
  );
