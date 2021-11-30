import styled from '@emotion/styled';
import { AccountCircle, ArrowDropDown } from '@mui/icons-material';
import { AppBar, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import { MY_INFORMATION_PROFILE_PATH } from 'knitting/constants/path';
import { Logo } from 'knitting/dumbs';
import { theme } from 'knitting/themes';
import { deleteAccessToken } from 'knitting/utils/auth';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const StyledIconButton = styled(IconButton)`
  border-radius: ${theme.spacing(6)};
`;

const Header = (): React.ReactElement => {
  const [anchorElement, setAnchorElement] = React.useState<
    HTMLElement | undefined
  >();
  const open = Boolean(anchorElement);
  const history = useHistory();
  const location = useLocation();

  const handleMenu = ({ currentTarget }: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(undefined);
  };

  const onClickMyProfile = () => {
    handleClose();
    if (location.pathname === MY_INFORMATION_PROFILE_PATH) {
      window.location.reload();
    } else {
      history.push(MY_INFORMATION_PROFILE_PATH);
    }
  };

  const onClickLogout = () => {
    deleteAccessToken();
    handleClose();
    window.location.reload();
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
            <MenuItem onClick={onClickLogout}>로그아웃</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
