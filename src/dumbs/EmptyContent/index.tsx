import { Button, Typography } from '@mui/material';
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

const Description = styled(Typography)`
  display: block;
  color: ${palette.text.secondary};
  margin-top: ${theme.spacing(1)};
`;

const CreateButton = styled(Button)`
  margin-top: ${theme.spacing(3)};
`;

export interface EmptyContentProps {
  title: string;
  description?: string;
  buttonText: string;
  onClick: () => void;
}

const EmptyContent = ({
  title,
  description,
  buttonText,
  onClick,
}: EmptyContentProps): React.ReactElement => {
  return (
    <EmptyContentContainer>
      <Typography variant="h5">{title}</Typography>
      {description != null && (
        <Description variant="caption">{description}</Description>
      )}
      <CreateButton variant="contained" color="primary" onClick={onClick}>
        {buttonText}
      </CreateButton>
    </EmptyContentContainer>
  );
};

export default EmptyContent;
