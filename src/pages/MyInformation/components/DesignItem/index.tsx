import { Typography, ListItem } from '@material-ui/core';
import { Ellipsis } from 'components';
import Skeleton from 'dumbs/Skeleton';
import styled from 'styled-components';
import { theme } from 'themes';
import { palette } from 'themes/palette';
import { formatDate } from 'utils/format';

interface Props {
  name?: string;
  yarn?: string;
  cover_image_url?: string;
  tags?: string[];
  created_at?: string;
  showDivider?: boolean;
  isLoading?: boolean;
}

const StyledListItem = styled(ListItem)`
  padding: ${theme.spacing(3)};
  display: block;
`;

const ListItemContainer = styled.div`
  display: flex;
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

const DesignItem = ({
  name = '',
  cover_image_url: coverImageUrl,
  yarn = '',
  tags = [],
  created_at: createdAt,
  showDivider = true,
  isLoading = false,
}: Props): React.ReactElement => {
  return (
    <StyledListItem button>
      <ListItemContainer>
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
              {isLoading ? <Skeleton variant="text" /> : formatDate(createdAt)}
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
