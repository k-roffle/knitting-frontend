export const numbers = '0-9';

export const getEndHashtagMatch = (unit: string): RegExp =>
  // eslint-disable-next-line no-useless-escape
  new RegExp(`^(?:[${numbers}]+[${unit}]|:\/\/)`);

export const getHashSigns = (unit: string): RegExp => new RegExp(unit);

export const getUnitDecoratorBoundary = (unit: string): RegExp =>
  new RegExp(
    `((?:^|$|[^${numbers}]))([${numbers}]*)([${numbers}]+[${unit}])`,
    'gi',
  );
