import { ContentBlock } from 'draft-js';

import { extractUnitDecoratorsWithIndices } from './utils/extractUnitDecorator';

export default (
  unit: string,
  contentBlock: ContentBlock,
  callback: (begin: number, end: number) => void,
): void => {
  const text = contentBlock.getText();
  const results = extractUnitDecoratorsWithIndices(unit, text);

  results.forEach((unitDecorator) => {
    const { indices } = unitDecorator;

    callback(indices[0], indices[1]);
  });
};
