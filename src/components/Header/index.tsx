import { AppBar, IconButton, Menu, MenuItem, Toolbar } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { theme } from 'themes';

const Logo = styled.div`
  width: 100%;
  font-size: 1.7rem;
  font-weight: 700;
  letter-spacing: -2px;
`;

const LogoIcon = styled.span`
  margin-right: ${theme.spacing(1)};
`;

const Header = (): React.ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | undefined>();
  const open = Boolean(anchorEl);

  const handleMenu = ({ currentTarget }: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  return (
    <AppBar color="inherit">
      <Toolbar>
        <Logo>
          <LogoIcon>🧶</LogoIcon>knitting
        </Logo>
        <div>
          <IconButton onClick={handleMenu} color="inherit">
            {/* TODO: 구글 로그인시 구글 프로필이 있는 경우 프로필을 보여줍니다 */}
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
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
