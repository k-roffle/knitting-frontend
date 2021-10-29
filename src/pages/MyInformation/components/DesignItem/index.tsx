import { Typography, ListItem, Checkbox } from '@material-ui/core';
import { Ellipsis } from 'components';
import Skeleton from 'dumbs/Skeleton';
import { DesignItemResponse } from 'pages/MyInformation/hooks/types';
import { MouseEvent } from 'react';
import styled from 'styled-components';
import { theme } from 'themes';
import { palette } from 'themes/palette';
import { formatDate } from 'utils/format';

interface Props {
  showDivider?: boolean;
  isLoading?: boolean;
  showCheckBox?: boolean;
  checked?: boolean;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

const StyledListItem = styled(ListItem)`
  padding: ${theme.spacing(3)};
  display: block;
`;

const ListItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ImageWrapper = styled.div`
  width: ${theme.spacing(32)};
  height: ${theme.spacing(17)};
  margin-right: ${theme.spacing(2)};
  overflow: hidden;
`;

const Content = styled.div`
  width: 100%;
`;

const Name = styled(Typography)`
  margin-bottom: ${theme.spacing(1.5)};
`;

const DesignType = styled.span`
  display: inline-block;
  color: ${palette.grey[800]};
  background-color: rgba(0, 0, 0, 0.06);
  padding: ${theme.spacing(0.5, 1)};
  border-radius: ${theme.spacing(0.5)};
  font-size: 14px;
  margin-right: ${theme.spacing(1)};
`;

const Information = styled(Typography)`
  color: ${palette.grey[800]};
  margin-bottom: ${theme.spacing(0.5)};
`;

const CreatedDate = styled(Typography)`
  display: block;
  color: ${palette.text.secondary};
  margin-bottom: ${theme.spacing(2)};
`;

const ThumbNail = styled.img`
  position: relative;
  top: 50%;
  left: 50%;
  width: 100%;
  height: auto;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const Divider = styled.div`
  margin: ${theme.spacing(3, -3, -3)};
  height: 1px;
  background-color: ${palette.grey[300]};
`;

const StyledCheckBox = styled(Checkbox)`
  width: ${theme.spacing(3.5)};
  height: ${theme.spacing(3.5)};
  padding-right: ${theme.spacing(2)};

  &:hover {
    background-color: transparent;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

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
