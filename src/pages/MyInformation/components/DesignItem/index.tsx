import { Ellipsis } from 'components';
import Skeleton from 'dumbs/Skeleton';
import { DesignItemResponse } from 'pages/MyInformation/hooks/types';
import { MouseEvent } from 'react';
import { theme } from 'themes';
import { formatDate } from 'utils/format';

import {
  StyledListItem,
  ListItemContainer,
  ImageWrapper,
  Content,
  Name,
  DesignType,
  Information,
  CreatedDate,
  ThumbNail,
  Divider,
  StyledCheckBox,
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
  tags = [],
  created_at: createdAt,
  showDivider = true,
  isLoading = false,
  showCheckBox,
  checked = false,
  onClick,
}: Props & DesignItemResponse): React.ReactElement => {
  return (
    <StyledListItem button onClick={onClick}>
      <ListItemContainer>
        {showCheckBox && (
          <StyledCheckBox
            color="primary"
            edge="start"
            checked={checked}
            disableRipple
          />
        )}
        {(isLoading || coverImageUrl) && (
          <ImageWrapper>
            <Skeleton
              isLoading={isLoading}
              variant="rect"
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
        </Content>
      </ListItemContainer>
      {showDivider && <Divider />}
    </StyledListItem>
  );
};

export default DesignItem;
