import { ContentBlock } from 'draft-js';

import { extractDeleteDecoratorsWithIndices } from './utils/extractDeleteDecorator';

export default (
  units: string[],
  contentBlock: ContentBlock,
  callback: (begin: number, end: number) => void,
): void => {
  const text = contentBlock.getText();

  const results = extractDeleteDecoratorsWithIndices({
    units,
    text,
    contentBlock,
  });

  results.forEach((unitDecorator) => {
    const { indices } = unitDecorator;

    callback(indices[0], indices[1]);
  });
};
