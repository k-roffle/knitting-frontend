import { flexCenterAlign } from 'knitting/styles/constants';

import styled from '@emotion/styled';

export const FileInput = styled.input`
  display: none;
`;

export const ImagesContainer = styled.div`
  display: flex;
`;

export const DropZone = styled.div<{
  width: number;
  height: number;
  error?: boolean;
}>`
  cursor: pointer;
  border: ${({ error, theme }) =>
    error
      ? `1.5px solid ${theme.palette.error.main}`
      : `1px solid ${theme.palette.grey[300]}`};
  border-radius: ${({ theme }) => theme.spacing(1)};
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  margin-right: ${({ theme }) => theme.spacing(2)};

  img {
    object-fit: contain;
  }
`;

export const UploadContainer = styled.div`
  ${flexCenterAlign}

  height: 100%;
  color: ${({ theme }) => theme.palette.text.secondary};
  flex-direction: column;

  svg {
    font-size: 3rem;
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }
`;
