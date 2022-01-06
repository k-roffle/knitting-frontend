import { EditorPlugin } from '@draft-js-plugins/editor';
import { ContentBlock } from 'draft-js';
import deleteDecoratorStrategy from 'knitting/plugins/deleteDecorator/deleteDecoratorStrategy';

import DeleteDecorator from '../deleteDecorator/deleteDecorator';

export interface UnitDecoratorPluginConfig {
  units?: string[];
}

export default (config: UnitDecoratorPluginConfig = {}): EditorPlugin => {
  const { units = ['코'] } = config;

  return {
    decorators: [
      {
        strategy: (
          contentBlock: ContentBlock,
          callback: (begin: number, end: number) => void,
        ) => deleteDecoratorStrategy(units, contentBlock, callback),
        component: DeleteDecorator,
      },
    ],
  };
};
