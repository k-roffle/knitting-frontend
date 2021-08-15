import { Typography, ListItem } from '@material-ui/core';
import { Ellipsis } from 'components';
import styled from 'styled-components';
import { theme } from 'themes';
import { palette } from 'themes/palette';

interface Props {
  name: string;
  imageUrl?: string;
  yarn: string;
  tags: string[];
  showDivider?: boolean;
}

const StyledListItem = styled(ListItem)`
  padding: ${theme.spacing(3)};
  display: block;
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

const ThumbNail = styled.img``;

const Divider = styled.div`
  margin: ${theme.spacing(3, -3, -3)};
  height: 1px;
  background-color: ${palette.grey[300]};
`;

const DesignItem = ({
  name,
  imageUrl,
  yarn,
  tags,
  showDivider = true,
}: Props): React.ReactElement => {
  return (
    <StyledListItem button>
      <div>
        <Name variant="h4">
          <Ellipsis text={name} />
        </Name>
        <Information variant="subtitle2">{yarn}</Information>
        {tags.map((tag) => (
          <DesignType key={tag}>{tag}</DesignType>
        ))}
      </div>
      {imageUrl && <ThumbNail src={imageUrl} />}
      {showDivider && <Divider />}
    </StyledListItem>
  );
};

export default DesignItem;
