import styled from '@emotion/styled';
import { Tab } from '@mui/material';

export const StyledTab = styled(Tab)`
  display: flex;
  justify-content: space-around;
  width: 270px;
  font-size: ${({ theme }) => theme.spacing(1.75)};
  font-weight: bold;
  min-height: auto;
`;
