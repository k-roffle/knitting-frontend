import { MenuItem, MenuItemProps } from '@material-ui/core';
import React from 'react';

interface Props {
  onSelect?(value: number): void;
  onClick?(value: number): void;

  active: boolean;
  disabled?: boolean;
  value: number;
  key: string;
  children: React.ReactNode;
}

export const DropdownOption = ({
  onSelect,
  onClick,
  active,
  disabled,
  value,
  key,
  children,
}: Props): React.ReactElement => {
  const handleClick: MenuItemProps['onClick'] = (event): void => {
    if (!disabled) {
      if (onSelect) {
        onSelect?.(value);
      }
      if (onClick) {
        event.stopPropagation();
        onClick?.(value);
      }
    }
  };

  return (
    <MenuItem value={value} key={key} onClick={handleClick} selected={active}>
      {children}
    </MenuItem>
  );
};
