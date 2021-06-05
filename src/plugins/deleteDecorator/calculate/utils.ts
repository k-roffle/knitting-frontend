import { ContentBlock } from 'draft-js';

import { CalculatedPosition, SplitByDecorators } from './types';

const getHasCalculatedStyle = (
  index: number,
  contentBlock: ContentBlock,
): boolean => {
  return contentBlock
    .getInlineStyleAt(index)
    .some((style) => style?.includes('CALCULATE') ?? false);
};

export const getCanCalculated = ({
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
    const hasCalculatedStyle = getHasCalculatedStyle(
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

export const getMatchSplitByDecorators = ({
  match,
  offset,
  contentBlock,
}: SplitByDecorators): string[] => {
  let accumulatorIndex = 0;
  let hasPrevCalculatedStyle = false;

  return match.split('').reduce(
    (accumulator, currentValue, charIndex) => {
      const hasCalculatedStyle = getHasCalculatedStyle(
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
};
