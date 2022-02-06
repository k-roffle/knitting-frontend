import {
  NOT_CALCULATE,
  REPEAT_APPROXIMATION_TYPE,
  UNIT_APPROXIMATION_TYPE,
} from 'knitting/plugins/unitDecorator/types';
import React from 'react';

import { TooltipMenuContainer, TooltipMenu } from '../DetailTooltipMenu';

interface Props {
  currentCalculateKey: UNIT_APPROXIMATION_TYPE | undefined;
  displayedApproximations: Record<string, string>;

  onClick(event: React.MouseEvent, key: REPEAT_APPROXIMATION_TYPE): void;
}

export const RepeatTooltipMenu = ({
  currentCalculateKey,
  displayedApproximations,
  onClick,
}: Props): React.ReactElement => (
  <TooltipMenuContainer>
    {Object.values(displayedApproximations).map(
      (displayApproximation, index): React.ReactElement => {
        const menuKey = Object.keys(displayedApproximations)[
          index
        ] as REPEAT_APPROXIMATION_TYPE;
        const isSelectedCalculateKey =
          menuKey === NOT_CALCULATE && currentCalculateKey === menuKey;

        return (
          <TooltipMenu
            key={menuKey}
            onClick={(event): void => onClick(event, menuKey)}
            isSelectedCalculateKey={isSelectedCalculateKey}
          >
            {displayApproximation}
          </TooltipMenu>
        );
      },
    )}
  </TooltipMenuContainer>
);
