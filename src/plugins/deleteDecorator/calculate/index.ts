import { ContentBlock } from 'draft-js';
import { getUnitDecoratorBoundary } from 'plugins/unitDecorator/calculate/regex';

import { getUnitTotallyMatch, getAllGroupsIntoSpace } from './regex';
import { UnitDecoratorIndice } from './types';
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
}: Props): UnitDecoratorIndice[] => {
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

    const unitProportionMatches = match.match(
      getUnitDecoratorBoundary(unitsRegrex),
    );
    let splitByDecorators: string[] = [];

    if (unitProportionMatches) {
      splitByDecorators = match.split(getUnitDecoratorBoundary(unitsRegrex));
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
