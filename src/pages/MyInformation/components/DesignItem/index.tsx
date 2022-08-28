import { Ellipsis } from 'knitting/components';
import Skeleton from 'knitting/dumbs/Skeleton';
import { DesignItemResponse } from 'knitting/pages/MyInformation/hooks/types';
import { formatDate } from 'knitting/utils/format';

import MenuIcon from '@mui/icons-material/Menu';
import {
  Checkbox,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@mui/material';
import React, { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  StyledListItemButton,
  ListItemContainer,
  ImageWrapper,
  Content,
  Name,
  Information,
  CreatedDate,
  ThumbNail,
  Divider,
  Price,
  HamburgerMenu,
  Menu,
} from './DesignItem.css';

interface Props {
  showDivider?: boolean;
  isLoading?: boolean;
  showCheckBox?: boolean;
  checked?: boolean;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

const DesignItem = ({
  id,
  name = '',
  cover_image_url: coverImageUrl,
  yarn = '',
  price = 0,
  tags = [],
  created_at: createdAt,
  showDivider = true,
  isLoading = false,
  showCheckBox,
  checked = false,
  onClick,
}: Props & DesignItemResponse): React.ReactElement => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClick = () => {
    navigate(`/my/designs/create?id=${id}`);
  };
  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  return (
    <StyledListItemButton onClick={onClick}>
      <ListItemContainer>
        {showCheckBox && (
          <Checkbox edge="start" checked={checked} disableRipple />
        )}
        {(isLoading || coverImageUrl) && (
          <ImageWrapper>
            <Skeleton
              isLoading={isLoading}
              variant="rectangular"
              width="100%"
              height="100%"
            >
              {coverImageUrl && <ThumbNail src={coverImageUrl} />}
            </Skeleton>
          </ImageWrapper>
        )}
        <Content>
          <Name variant="h4">
            <Skeleton isLoading={isLoading} variant="text">
              <Ellipsis text={name} />
            </Skeleton>
          </Name>
          <Information variant="subtitle2">
            <Skeleton isLoading={isLoading} variant="text">
              {tags.map((tag) => `${tag} · `)}
              {yarn}
            </Skeleton>
          </Information>
          {createdAt != null && (
            <CreatedDate variant="caption">
              <Skeleton isLoading={isLoading} variant="text">
                도안작성일 {formatDate(createdAt, 'YYYY-MM-DD hh:mm:ss')}
              </Skeleton>
            </CreatedDate>
          )}
          <Price>
            <Skeleton isLoading={isLoading} variant="text">
              {price.toLocaleString()}원
            </Skeleton>
          </Price>
        </Content>
        <Menu>
          <HamburgerMenu ref={anchorRef} onClick={handleToggle}>
            <MenuIcon />
          </HamburgerMenu>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList>
                      <MenuItem onClick={handleClick}>도안 수정하기</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Menu>
      </ListItemContainer>
      {showDivider && <Divider />}
    </StyledListItemButton>
  );
};

export default DesignItem;
