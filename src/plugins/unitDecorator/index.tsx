import { EditorPlugin } from '@draft-js-plugins/editor';
import { ContentBlock } from 'draft-js';
import { ComponentType, ReactElement } from 'react';

import { UNIT_TYPE } from './types';
import UnitDecorator, { UnitDecoratorProps } from './unitDecorator';
import unitDecoratorStrategy from './unitDecoratorStrategy';

export type { UnitDecoratorProps };
export interface UnitDecoratorPluginConfig {
  unit?: UNIT_TYPE;
  unitDecoratorComponent?: ComponentType<UnitDecoratorProps>;
}

export default (config: UnitDecoratorPluginConfig = {}): EditorPlugin => {
  const {
    unit = '코',
    unitDecoratorComponent: UnitDecoratorComponent = UnitDecorator,
  } = config;
  const DecoratedUnitDecorator = (props: UnitDecoratorProps): ReactElement => (
    <UnitDecoratorComponent {...props} unit={unit} />
  );

  return {
    decorators: [
      {
        strategy: (
          contentBlock: ContentBlock,
          callback: (begin: number, end: number) => void,
        ) => unitDecoratorStrategy(unit, contentBlock, callback),
        component: DecoratedUnitDecorator,
      },
    ],
  };
};
