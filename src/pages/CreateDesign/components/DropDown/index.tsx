import { MenuListProps } from '@material-ui/core';
import {
  ArrowDropDown as ArrowDropDownIcon,
  ArrowDropUp as ArrowDropUpIcon,
} from '@material-ui/icons';
import React, { useEffect, useState } from 'react';

import { DropDownWrapper, OptionWrapper, SelectedButton } from './DropDown.css';

interface Props {
  onChange(value: number): void;
  value?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}

export const DropDown = ({
  onChange,
  value,
  children,
}: Props): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const currentValue = value;

  const handleListOpen = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setIsOpen(true);
  };

  const preventBubblingUp = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  const stopPropagation: MenuListProps['onClick'] = (event): void => {
    event.stopPropagation();
  };

  const handleChange = (selectedValue: number): void => {
    setIsOpen(!isOpen);
    onChange(selectedValue);
  };
  const childrens = children.slice(1, children.length);

  useEffect(() => {
    const handleClick = (): void => {
      setIsOpen(!isOpen);
    };

    if (isOpen) {
      document.addEventListener('click', handleClick);
    }
    return (): void => {
      document.removeEventListener('click', handleClick);
    };
  }, [isOpen]);

  return (
    <DropDownWrapper onMouseDown={preventBubblingUp}>
      <SelectedButton onClick={handleListOpen}>
        {currentValue}
        {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </SelectedButton>
      {isOpen && (
        <OptionWrapper onClick={stopPropagation}>
          {React.Children.map(childrens, (option, index) => {
            return (
              option &&
              React.cloneElement(option, {
                onSelect: handleChange,
                index,
              })
            );
          })}
        </OptionWrapper>
      )}
    </DropDownWrapper>
  );
};
