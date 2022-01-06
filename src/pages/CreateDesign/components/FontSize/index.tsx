import { toggleCustomInlineStyle } from 'knitting/libs/draftjs-utils/inline';
import React, { useEffect, useState } from 'react';

import { DropDown } from '../DropDown';
import { DropdownOption } from '../DropDown/DropDownOption';

import { fontSizeOptions, FontSizeProps } from './types';

export const FontSize = ({
  onChange,
  onChangeCustomStyleMap,
  editorState,
  defaultFontSize,
  fontSize,
}: FontSizeProps): React.ReactElement => {
  const toggleFontSize = (newFontSize: number) => {
    const newState = toggleCustomInlineStyle({
      editorState,
      styleType: 'fontSize',
      style: newFontSize,
      isAlreadyApplied: newFontSize === currentFontSize,
      onChangeCustomStyleMap,
    });

    if (newState) {
      onChange?.(newState);
    }
  };

  const [currentFontSize, setCurrentFontSize] = useState(
    fontSize || defaultFontSize,
  );

  useEffect(() => {
    setCurrentFontSize(fontSize || defaultFontSize);
  }, [fontSize]);

  return (
    <DropDown
      value={currentFontSize}
      onChange={(size) => {
        setCurrentFontSize(size === currentFontSize ? defaultFontSize : size);
        toggleFontSize(size);
      }}
    >
      {currentFontSize && <span>{currentFontSize}</span>}
      {fontSizeOptions.map((size, index) => {
        return (
          <DropdownOption
            active={currentFontSize === size}
            value={size}
            key={index.toString()}
          >
            {size}
          </DropdownOption>
        );
      })}
    </DropDown>
  );
};
