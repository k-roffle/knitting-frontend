import { Button, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { flexCenterAlign } from 'styles/constants';
import { theme } from 'themes';
import { palette } from 'themes/palette';

const EmptyContentContainer = styled.div`
  ${flexCenterAlign}

  flex-direction: column;
  padding: ${theme.spacing(7)};
`;

const Subtitle = styled(Typography)`
  display: block;
  color: ${palette.text.secondary};
  margin-top: ${theme.spacing(1)};
`;

const CreateButton = styled(Button)`
  margin-top: ${theme.spacing(3)};
`;

export interface EmptyContentProps {
  title: string;
  subtitle?: string;
  buttonText: string;
  onClick: () => void;
}

const EmptyContent = ({
  title,
  subtitle,
  buttonText,
  onClick,
}: EmptyContentProps): React.ReactElement => {
  return (
    <EmptyContentContainer>
      <Typography variant="h5">{title}</Typography>
      {subtitle != null && <Subtitle variant="caption">{subtitle}</Subtitle>}
      <CreateButton variant="contained" color="primary" onClick={onClick}>
        {buttonText}
      </CreateButton>
    </EmptyContentContainer>
  );
};

export default EmptyContent;
