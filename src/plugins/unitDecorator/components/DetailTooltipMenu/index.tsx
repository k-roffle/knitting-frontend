import { UNIT_APPROXIMATION_TYPE } from 'knitting/plugins/unitDecorator/types';
import { theme } from 'knitting/themes';
import { palette } from 'knitting/themes/palette';
import React from 'react';
import styled, { css } from 'styled-components';

export interface TooltipMenuProps {
  isSelectedCalculateKey: boolean;
}

export const TooltipMenuContainer = styled.div`
  display: flex;
`;

export const TooltipMenu = styled.span<TooltipMenuProps>`
  padding: ${theme.spacing(0.8)};
  margin: ${theme.spacing(0.2)};
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background-color: ${palette.action.hover};
  }

  ${({ isSelectedCalculateKey }) =>
    isSelectedCalculateKey &&
    css`
      background-color: ${palette.action.selected};
    `}
`;

interface Props {
  currentCalculateKey: UNIT_APPROXIMATION_TYPE | undefined;
  displayedApproximations: Record<string, string>;

  onClick(key: UNIT_APPROXIMATION_TYPE): void;
}

export const DetailTooltipMenu = ({
  currentCalculateKey,
  displayedApproximations,
  onClick,
}: Props): React.ReactElement => (
  <TooltipMenuContainer>
    {Object.values(displayedApproximations).map(
      (displayApproximation, index): React.ReactElement => {
        const menuKey = Object.keys(displayedApproximations)[
          index
        ] as UNIT_APPROXIMATION_TYPE;

        const isSelectedCalculateKey = currentCalculateKey === menuKey;

        return (
          <TooltipMenu
            key={menuKey}
            onClick={(): void => onClick(menuKey)}
            isSelectedCalculateKey={isSelectedCalculateKey}
          >
            {displayApproximation}
          </TooltipMenu>
        );
      },
    )}
  </TooltipMenuContainer>
);
