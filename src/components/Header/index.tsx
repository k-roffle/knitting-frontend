import { AppBar, IconButton, Menu, MenuItem, Toolbar } from '@material-ui/core';
import { AccountCircle, ArrowDropDown } from '@material-ui/icons';
import { Logo } from 'dumbs';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from 'themes';
import { deleteAccessToken } from 'utils/auth';

const StyledIconButton = styled(IconButton)`
  border-radius: ${theme.spacing(6)};
`;

const Header = (): React.ReactElement => {
  const [anchorElement, setAnchorElement] = React.useState<
    HTMLElement | undefined
  >();
  const open = Boolean(anchorElement);
  const history = useHistory();

  const handleMenu = ({ currentTarget }: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(undefined);
  };

  const onClickMyProfile = () => {
    console.log('onClickMyProfile');
    history.push('/my');
    handleClose();
  };

  const onClickLogout = () => {
    console.log('onClickLogout');
    deleteAccessToken();
    handleClose();
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
            <MenuItem onClick={onClickMyProfile}>내 정보</MenuItem>
            <MenuItem onClick={onClickLogout}>로그아웃11</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
