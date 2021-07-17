import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from 'themes';

const getTextStyle = (size: 'small' | 'large'): string => {
  switch (size) {
    case 'small':
      return 'font-size: 1.2rem; letter-spacing: -0.9px';
    case 'large':
      return 'font-size: 1.7rem; letter-spacing: -2px';
    default:
      return '';
  }
};

const LogoWrapper = styled.div<Props>`
  ${({ size }) => getTextStyle(size)};
  ${({ align }) =>
    css`
      text-align: ${align};
    `};

  width: 100%;
  font-weight: 700;
`;

const LogoIcon = styled.span<Props>`
  ${({ size }) =>
    size === 'large' &&
    css`
      margin-right: ${theme.spacing(1)};
    `};
`;

interface Props {
  size: 'small' | 'large';
  align?: 'left' | 'center' | 'right';
}

const Logo = ({ size, align = 'left' }: Props): React.ReactElement => {
  return (
    <LogoWrapper size={size} align={align}>
      <LogoIcon size={size}>🧶</LogoIcon>knitting
    </LogoWrapper>
  );
};

export default Logo;
