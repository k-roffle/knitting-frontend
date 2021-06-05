import { getHashSigns, getUnitDecoratorBoundary } from './unitDecoratorRegex';

interface UnitDecoratorIndice {
  unitDecorator: string;
  indices: [number, number];
}

export function extractUnitDecoratorsWithIndices(
  unit: string,
  text: string,
): UnitDecoratorIndice[] {
  if (!text || !text.match(getHashSigns(unit))) {
    return [];
  }

  const tags: UnitDecoratorIndice[] = [];

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
}
