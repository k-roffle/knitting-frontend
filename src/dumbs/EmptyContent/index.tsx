import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import { flexCenterAlign } from 'knitting/styles/constants';
import React from 'react';
import { ReactChild } from 'react';

const EmptyContentContainer = styled.div`
  ${flexCenterAlign}
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing(7)};
  text-align: center;
`;

const Description = styled(Typography)`
  display: block;
  color: ${({ theme }) => theme.palette.text.secondary};
  margin-top: ${({ theme }) => theme.spacing(1)};
`;

const CreateButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(3)};
`;

export interface EmptyContentProps {
  title: ReactChild;
  description?: ReactChild;
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
