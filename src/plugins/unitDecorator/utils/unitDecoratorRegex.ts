export const numbers = '0-9';

export const getHashSigns = (unit: string): RegExp => new RegExp(unit);

export const getUnitDecoratorBoundary = (unit: string): RegExp =>
  new RegExp(`([${numbers}]+[${unit}])`, 'gi');
