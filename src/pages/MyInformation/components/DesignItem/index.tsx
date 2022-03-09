import { Ellipsis } from 'knitting/components';
import Skeleton from 'knitting/dumbs/Skeleton';
import { DesignItemResponse } from 'knitting/pages/MyInformation/hooks/types';
import { theme } from 'knitting/themes';
import { formatDate } from 'knitting/utils/format';

import { Checkbox } from '@mui/material';
import { MouseEvent } from 'react';

import {
  StyledListItemButton,
  ListItemContainer,
  ImageWrapper,
  Content,
  Name,
  DesignType,
  Information,
  CreatedDate,
  ThumbNail,
  Divider,
  Price,
} from './DesignItem.css';

interface Props {
  showDivider?: boolean;
  isLoading?: boolean;
  showCheckBox?: boolean;
  checked?: boolean;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

const DesignItem = ({
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
              {yarn}
            </Skeleton>
          </Information>
          {createdAt != null && (
            <CreatedDate variant="caption">
              <Skeleton isLoading={isLoading} variant="text">
                {formatDate(createdAt)}
              </Skeleton>
            </CreatedDate>
          )}

          {tags.map((tag) => (
            <DesignType key={tag}>
              <Skeleton
                isLoading={isLoading}
                variant="text"
                width={theme.spacing(5)}
              >
                {tag}
              </Skeleton>
            </DesignType>
          ))}

          <Price>
            <Skeleton isLoading={isLoading} variant="text">
              {price.toLocaleString()}원
            </Skeleton>
          </Price>
        </Content>
      </ListItemContainer>
      {showDivider && <Divider />}
    </StyledListItemButton>
  );
};

export default DesignItem;
