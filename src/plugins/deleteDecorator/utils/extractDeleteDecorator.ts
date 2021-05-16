import { ContentBlock } from 'draft-js';
import { getUnitDecoratorBoundary } from 'plugins/unitDecorator/utils/unitDecoratorRegex';

import {
  getUnitTotallyMatch,
  getAllGroupesIntoSpace,
} from './deleteDecoratorRegex';

interface UnitDecoratorIndice {
  unitDecorator: string;
  indices: [number, number];
}

interface Props {
  units: string[];
  text: string;
  contentBlock: ContentBlock;
}

export function extractDeleteDecoratorsWithIndices({
  units,
  text,
  contentBlock,
}: Props): UnitDecoratorIndice[] {
  if (!text) {
    return [];
  }

  const tags: UnitDecoratorIndice[] = [];
  const unitsRegrex = units.join('|');

  function replacer(
    match: string,
    _before: string,
    offset: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _chunk: string,
  ): string {
    const unitTotallyMatch = match.match(getUnitTotallyMatch(unitsRegrex));
    const unitProportionMatch = match.match(
      getUnitDecoratorBoundary(unitsRegrex),
    );

    if (unitTotallyMatch) {
      return '';
    }

    const startPosition = offset;
    let endPosition = startPosition + match.length;
    let unitDecorator = match;

    if (unitProportionMatch) {
      unitDecorator = match.slice(
        0,
        match.length - unitProportionMatch[0].length + 1,
      );

      endPosition = startPosition + unitDecorator.length;
    }

    let canCalculate = false;

    for (
      let currentPosition = startPosition;
      currentPosition < endPosition;
      currentPosition++
    ) {
      const hasCalculatedStyle = contentBlock
        .getInlineStyleAt(currentPosition)
        .some((style) => style?.includes('CALCULATE') ?? false);

      if (hasCalculatedStyle) {
        canCalculate = true;
        break;
      }
    }
    if (!canCalculate) {
      return '';
    }

    tags.push({
      unitDecorator,
      indices: [startPosition, endPosition],
    });
    return '';
  }

  text.replace(getAllGroupesIntoSpace(), replacer);

  return tags;
}
