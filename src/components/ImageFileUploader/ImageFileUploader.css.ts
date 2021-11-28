import styled from 'styled-components';
import { flexCenterAlign } from 'styles/constants';
import { theme } from 'themes';
import { palette } from 'themes/palette';

export const FileInput = styled.input`
  display: none;
`;

export const ImagesContainer = styled.div`
  display: flex;
`;

export const DropZone = styled.div<{ width: number; height: number }>`
  cursor: pointer;
  border: 1px solid ${palette.grey[300]};
  border-radius: ${theme.spacing(1)};
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  margin-right: ${theme.spacing(2)};

  img {
    object-fit: contain;
  }
`;

export const UploadContainer = styled.div`
  ${flexCenterAlign}

  height: 100%;
  color: ${palette.text.secondary};
  flex-direction: column;

  svg {
    font-size: 3rem;
    margin-bottom: ${theme.spacing(2)};
  }
`;
