import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from '@mui/material';
import React from 'react';

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
  ${({ size, theme }) =>
    size === 'large' &&
    css`
      margin-right: ${theme.spacing(1)};
    `};
`;

interface Props {
  size: 'small' | 'large';
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const Logo = ({
  size,
  align = 'left',
  className,
}: Props): React.ReactElement => {
  return (
    <Link href="/" underline="none" color="black">
      <LogoWrapper size={size} align={align} className={className}>
        <LogoIcon size={size}>🧶</LogoIcon>knitting
      </LogoWrapper>
    </Link>
  );
};

export default Logo;
