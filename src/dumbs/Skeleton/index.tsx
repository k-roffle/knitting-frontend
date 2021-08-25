import { Skeleton as OriginalSkeleton, SkeletonProps } from '@material-ui/lab';
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
