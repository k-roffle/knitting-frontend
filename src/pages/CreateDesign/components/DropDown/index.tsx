import { MenuList, MenuListProps } from '@material-ui/core';
import {
  ArrowDropDown as ArrowDropDownIcon,
  ArrowDropUp as ArrowDropUpIcon,
} from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from 'themes';
import { palette } from 'themes/palatte';

const DropDownWrapper = styled.div`
  height: ${theme.spacing(4)};
`;

const SelectedButton = styled.button`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  align-items: center;
  padding: ${theme.spacing(0.5, 1, 0.5, 1.5)};
`;

const OptionWrapper = styled(MenuList)`
  background: ${palette.background.paper};
  max-height: ${theme.spacing(27)};
  border-radius: ${theme.spacing(0.5)};
  box-shadow: ${theme.shadows[8]};
  overflow-y: scroll;
`;

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
            const temp =
              option &&
              React.cloneElement(option, {
                onSelect: handleChange,
                index,
              });

            return temp;
          })}
        </OptionWrapper>
      )}
    </DropDownWrapper>
  );
};
