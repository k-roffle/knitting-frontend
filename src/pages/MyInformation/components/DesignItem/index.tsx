import { Typography, ListItem } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Ellipsis } from 'components';
import styled from 'styled-components';
import { theme } from 'themes';
import { palette } from 'themes/palette';

interface Props {
  name?: string;
  yarn?: string;
  cover_image_url?: string;
  tags?: string[];
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
  margin-bottom: ${theme.spacing(1)};
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
  showDivider = true,
  isLoading = false,
}: Props): React.ReactElement => {
  return (
    <StyledListItem button>
      <ListItemContainer>
        {(isLoading || coverImageUrl) && (
          <ImageWrapper>
            {isLoading && (
              <Skeleton variant="rect" width="100%" height="100%" />
            )}
            {coverImageUrl && <ThumbNail src={coverImageUrl} />}
          </ImageWrapper>
        )}
        <Content>
          <Name variant="h4">
            {isLoading ? <Skeleton variant="text" /> : <Ellipsis text={name} />}
          </Name>
          <Information variant="subtitle2">
            {isLoading ? <Skeleton variant="text" /> : yarn}
          </Information>
          {tags.map((tag) => (
            <DesignType key={tag}>
              {isLoading ? (
                <Skeleton variant="text" width={theme.spacing(5)} />
              ) : (
                tag
              )}
            </DesignType>
          ))}
        </Content>
      </ListItemContainer>
      {showDivider && <Divider />}
    </StyledListItem>
  );
};

export default DesignItem;
