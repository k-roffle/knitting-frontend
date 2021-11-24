import { Box, Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { theme } from 'themes';

export const Row = styled(Grid)`
  padding: ${theme.spacing(1.5)};
`;

export const Profile = styled.img`
  margin: ${theme.spacing(0.5)};
  border-radius: ${theme.spacing(6.2)};
`;

export const Tag = styled.div`
  background: ${theme.palette.grey[300]};
  padding: ${theme.spacing(1.2)};
  border-radius: ${theme.spacing(5)};
  font-size: ${theme.spacing(1.5)};
  color: ${theme.palette.grey[700]};
  margin-right: ${theme.spacing(1)};

  &: last-child {
    margin-right: 0;
  }
`;

export const Price = styled(Typography)`
  margin-left: ${theme.spacing(1)};
`;

export const Design = styled(Box)`
  border-radius: ${theme.spacing(2)};
  border: ${theme.spacing(0.4)} solid ${theme.palette.grey[300]};
`;
