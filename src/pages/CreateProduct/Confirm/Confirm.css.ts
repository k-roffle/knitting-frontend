import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from 'themes';

export const ProductCard = styled(Link)`
  color: ${theme.palette.common.black};
  text-decoration: none;
  width: ${theme.spacing(55)};
  border: 5px solid ${theme.palette.grey[200]};
  border-radius: ${theme.spacing(6)};
`;

export const RepresentativeImage = styled.img`
  width: ${theme.spacing(55)};
  height: ${theme.spacing(46)};
  border-radius: ${theme.spacing(6)};
`;

export const Tag = styled.div`
  display: inline-block;
  background: ${theme.palette.grey[300]};
  padding: ${theme.spacing(1)};
  margin: ${theme.spacing(0.4)};
  border-radius: ${theme.spacing(2)};
  font-size: ${theme.spacing(1.5)};
`;

export const Price = styled(Typography)`
  margin-left: ${theme.spacing(1)};
`;

export const InfoMessage = styled.li`
  margin-top: ${theme.spacing(1)};
`;
