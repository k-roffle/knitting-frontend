import { Skeleton as OriginalSkeleton, SkeletonProps } from '@mui/material';
import React from 'react';

interface Props {
  isLoading?: boolean;
  children: React.ReactNode;
}
const Skeleton = ({
  isLoading,
  children,
  ...skeletonProps
}: Props & SkeletonProps): React.ReactElement => {
  return isLoading ? <OriginalSkeleton {...skeletonProps} /> : <> {children}</>;
};

export default Skeleton;
