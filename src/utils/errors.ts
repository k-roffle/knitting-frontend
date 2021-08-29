export function notFoundExpected(valueName: string): never {
  throw new Error(`cannot find ${valueName}.`);
}
