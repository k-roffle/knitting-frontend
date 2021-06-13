import { ContentBlock } from 'draft-js';
import { getUnitDecoratorBoundary } from 'plugins/unitDecorator/calculate/regex';

import { getUnitTotallyMatch, getAllGroupsIntoSpace } from './regex';
import { UnitDecoratorIndices } from './types';
import { getMatchSplitByDecorators, getCanCalculated } from './utils';

interface Props {
  units: string[];
  text: string;
  contentBlock: ContentBlock;
}

export const extractDeleteDecoratorsWithIndices = ({
  units,
  text,
  contentBlock,
}: Props): UnitDecoratorIndices[] => {
  if (!text) {
    return [];
  }

  const tags: UnitDecoratorIndices[] = [];
  const unitsRegex = units.join('|');

  function replacer(
    match: string,
    _before: string,
    offset: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _chunk: string,
  ): string {
    const unitTotallyMatch = match.match(getUnitTotallyMatch(unitsRegex));

    if (unitTotallyMatch) {
      return '';
    }

    const unitProportionMatches = match.match(
      getUnitDecoratorBoundary(unitsRegex),
    );
    let splitByDecorators: string[] = [];

    if (unitProportionMatches) {
      splitByDecorators = match.split(getUnitDecoratorBoundary(unitsRegex));
    } else {
      splitByDecorators = getMatchSplitByDecorators({
        match,
        offset,
        contentBlock,
      });
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
};
