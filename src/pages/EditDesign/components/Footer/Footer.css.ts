import styled from '@emotion/styled';

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(6, 0, 4)};
  > button {
    height: fit-content;
  }
`;

export const NextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > button {
    width: fit-content;
  }
  > span {
    margin-top: ${({ theme }) => theme.spacing(1)};
    color: ${({ theme }) => theme.palette.error.main};
  }
`;
