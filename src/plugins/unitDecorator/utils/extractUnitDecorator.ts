import {
  getEndHashtagMatch,
  getHashSigns,
  getUnitDecoratorBoundary,
} from './unitDecoratorRegex';

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
    before: string,
    _hash: string,
    hashText: string,
    offset: number,
    chunk: string,
  ): string {
    const after = chunk.slice(offset + match.length);

    if (after.match(getEndHashtagMatch(unit))) {
      return '';
    }

    const startPosition = offset + before.length;
    const endPosition =
      startPosition + (offset === 0 ? match.length : match.length - 1);

    tags.push({
      unitDecorator: hashText,
      indices: [startPosition, endPosition],
    });
    return '';
  }

  text.replace(getUnitDecoratorBoundary(unit), replacer);

  return tags;
}
