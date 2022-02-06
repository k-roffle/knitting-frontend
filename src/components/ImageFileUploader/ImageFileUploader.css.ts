import styled from '@emotion/styled';
import { flexCenterAlign } from 'knitting/styles/constants';

export const FileInput = styled.input`
  display: none;
`;

export const ImagesContainer = styled.div`
  display: flex;
`;

export const DropZone = styled.div<{ width: number; height: number }>`
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
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
