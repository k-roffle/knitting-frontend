import { AppBar, IconButton, Menu, MenuItem, Toolbar } from '@material-ui/core';
import { AccountCircle, ArrowDropDown } from '@material-ui/icons';
import { Logo } from 'dumbs';
import React from 'react';
import styled from 'styled-components';
import { theme } from 'themes';

const StyledIconButton = styled(IconButton)`
  border-radius: ${theme.spacing(6)};
`;

const Header = (): React.ReactElement => {
  const [anchorElement, setAnchorElement] = React.useState<
    HTMLElement | undefined
  >();
  const open = Boolean(anchorElement);

  const handleMenu = ({ currentTarget }: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(undefined);
  };

  return (
    <AppBar color="inherit">
      <Toolbar>
        <Logo size="large" />
        <div>
          <StyledIconButton onClick={handleMenu} color="inherit">
            {/* TODO: 구글 로그인시 구글 프로필이 있는 경우 프로필을 보여줍니다 */}
            <AccountCircle />
            <ArrowDropDown />
          </StyledIconButton>
          <Menu
            anchorEl={anchorElement}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>내 정보</MenuItem>
            <MenuItem onClick={handleClose}>로그아웃</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
