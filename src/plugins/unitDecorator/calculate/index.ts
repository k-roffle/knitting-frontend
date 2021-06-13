import { UnitDecoratorIndices } from 'plugins/deleteDecorator/calculate/types';

import { getHashSigns, getUnitDecoratorBoundary } from './regex';

export const extractUnitDecoratorsWithIndices = (
  unit: string,
  text: string,
): UnitDecoratorIndices[] => {
  if (!text || !text.match(getHashSigns(unit))) {
    return [];
  }

  const tags: UnitDecoratorIndices[] = [];

  function replacer(
    match: string,
    _before: string,
    offset: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _chunk: string,
  ): string {
    const startPosition = offset;
    const endPosition = startPosition + match.length;

    tags.push({
      unitDecorator: match,
      indices: [startPosition, endPosition],
    });
    return '';
  }

  text.replace(getUnitDecoratorBoundary(unit), replacer);

  return tags;
};
