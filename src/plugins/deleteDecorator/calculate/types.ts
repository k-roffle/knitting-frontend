import { ContentBlock } from 'draft-js';

export interface UnitDecoratorIndice {
  unitDecorator: string;
  indices: [number, number];
}

export interface CalculatedPosition {
  startPosition: number;
  endPosition: number;
  contentBlock: ContentBlock;
}

export interface SplitByDecorators {
  match: string;
  offset: number;
  contentBlock: ContentBlock;
}
