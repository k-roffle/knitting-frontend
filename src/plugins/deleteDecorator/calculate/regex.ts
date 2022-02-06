import { numbers } from 'knitting/plugins/unitDecorator/calculate/regex';

export const getUnitTotallyMatch = (units = '코'): RegExp =>
  new RegExp(`^[${numbers}]+[${units}]$`, 'gi');

export const getAllGroupsIntoSpace = (): RegExp =>
  // eslint-disable-next-line no-useless-escape
  new RegExp(`(\\S{1,})`, 'g');
