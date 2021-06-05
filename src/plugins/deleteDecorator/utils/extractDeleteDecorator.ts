import { ContentBlock } from 'draft-js';

import {
  getUnitTotallyMatch,
  getAllGroupsIntoSpace,
  getUnitIncludeMatch,
} from './deleteDecoratorRegex';

interface UnitDecoratorIndice {
  unitDecorator: string;
  indices: [number, number];
}

interface CalculatedPosition {
  startPosition: number;
  endPosition: number;
  contentBlock: ContentBlock;
}

const gethasCalculatedStyle = (
  index: number,
  contentBlock: ContentBlock,
): boolean => {
  return contentBlock
    .getInlineStyleAt(index)
    .some((style) => style?.includes('CALCULATE') ?? false);
};

const getCanCalculated = ({
  startPosition,
  endPosition,
  contentBlock,
}: CalculatedPosition): boolean => {
  let canCalculate = false;

  for (
    let currentPosition = startPosition;
    currentPosition < endPosition;
    currentPosition++
  ) {
    const hasCalculatedStyle = gethasCalculatedStyle(
      currentPosition,
      contentBlock,
    );

    if (hasCalculatedStyle) {
      canCalculate = true;
      break;
    }
  }

  return canCalculate;
};

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

    if (unitTotallyMatch) {
      return '';
    }

    const unitProportionMatches = match.match(getUnitIncludeMatch(unitsRegrex));
    let splitByDecorators: string[] = [];

    if (unitProportionMatches) {
      splitByDecorators = match.split(getUnitIncludeMatch(unitsRegrex));
    } else {
      let accumulatorIndex = 0;
      let hasPrevCalculatedStyle = false;

      splitByDecorators = match.split('').reduce(
        (accumulator, currentValue, charIndex) => {
          const hasCalculatedStyle = gethasCalculatedStyle(
            offset + charIndex,
            contentBlock,
          );

          if (hasPrevCalculatedStyle !== hasCalculatedStyle) {
            accumulatorIndex += 1;
          }
          hasPrevCalculatedStyle = hasCalculatedStyle;

          accumulator[accumulatorIndex] = (
            accumulator[accumulatorIndex] ?? ''
          ).concat(currentValue);
          return accumulator;
        },
        [''],
      );
    }

    splitByDecorators.reduce((accumulator, currentValue) => {
      if (unitProportionMatches?.includes(currentValue)) {
        return accumulator + currentValue;
      }

      const startPosition = offset + accumulator.length;
      const endPosition = startPosition + currentValue.length;
      const canCalculated = getCanCalculated({
        startPosition,
        endPosition,
        contentBlock,
      });

      if (canCalculated) {
        const unitDecorator = match.slice(startPosition, endPosition);

        tags.push({
          unitDecorator,
          indices: [startPosition, endPosition],
        });
      }

      return accumulator + currentValue;
    }, '');

    return '';
  }

  text.replace(getAllGroupsIntoSpace(), replacer);

  return tags;
}
