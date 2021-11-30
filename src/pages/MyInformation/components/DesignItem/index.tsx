import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Typography, ListItemButton } from '@mui/material';
import { Ellipsis } from 'knitting/components';
import Skeleton from 'knitting/dumbs/Skeleton';
import { formatDate } from 'knitting/utils/format';

interface Props {
  name?: string;
  yarn?: string;
  cover_image_url?: string;
  tags?: string[];
  created_at?: string;
  showDivider?: boolean;
  isLoading?: boolean;
}

const StyledListItemButton = styled(ListItemButton)`
  padding: ${({ theme }) => theme.spacing(3)};
  display: block;
`;

const ListItemContainer = styled.div`
  display: flex;
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  ${({ theme }) =>
    css`
      width: ${theme.spacing(32)};
      height: ${theme.spacing(17)};
      margin-right: ${theme.spacing(2)};
    `}
`;

const Content = styled.div`
  width: 100%;
`;

const Name = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(1.5)};
`;

const DesignType = styled.span`
  display: inline-block;
  background-color: rgba(0, 0, 0, 0.06);
  ${({ theme }) =>
    css`
      padding: ${theme.spacing(0.5, 1)};
      border-radius: ${theme.spacing(0.5)};
      margin-right: ${theme.spacing(1)};
      color: ${theme.palette.grey[800]};
    `}
`;

const Information = styled(Typography)`
  ${({ theme }) =>
    css`
      color: ${theme.palette.grey[800]};
      margin-bottom: ${theme.spacing(0.5)};
    `}
`;

const CreatedDate = styled(Typography)`
  display: block;
  ${({ theme }) =>
    css`
      color: ${theme.palette.text.secondary};
      margin-bottom: ${theme.spacing(2)};
    `}
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
  height: 1px;
  ${({ theme }) =>
    css`
      margin: ${theme.spacing(3, -3, -3)};
      background-color: ${theme.palette.grey[300]};
    `}
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
  const theme = useTheme();

  return (
    <StyledListItemButton>
      <ListItemContainer>
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
        </Content>
      </ListItemContainer>
      {showDivider && <Divider />}
    </StyledListItemButton>
  );
};

export default DesignItem;
