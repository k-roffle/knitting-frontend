import styled from '@emotion/styled';
import React, { useLayoutEffect, useRef, useState } from 'react';
import OriginalEllipsis from 'react-ellipsis-component';

const EllipsisWrapper = styled.div`
  overflow: hidden;
`;

export interface JsEllipsisProps {
  text: string;
  dangerouslyUseInnerHTML?: boolean;
  maxLine?: number;
  endExcludes?: string[];
  reflowThresholdOnResize?: number;
  onReflow?: (ellipsis: boolean, text: string) => void;
  onEllipsisClick?: () => void;
}

const Ellipsis = ({
  maxLine = 1,
  ...other
}: JsEllipsisProps): React.ReactElement => {
  const ellipsisRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useLayoutEffect(() => {
    const tooltipTarget = ellipsisRef?.current;
    const lineHeight =
      tooltipTarget == null ? null : getComputedStyle(tooltipTarget).lineHeight;

    const lineHeightNumber = Number(lineHeight?.replace(/[^-\\.0-9]/g, ''));
    const newMaxHeight = lineHeightNumber * maxLine + lineHeightNumber / 2;

    setMaxHeight(Math.round(newMaxHeight));
  }, [ellipsisRef, maxLine]);

  return (
    <EllipsisWrapper
      ref={ellipsisRef}
      style={{
        maxHeight: `${maxHeight}px`,
      }}
    >
      {maxHeight !== 0 && (
        <OriginalEllipsis
          maxLine={maxLine}
          maxHeight={maxHeight}
          ellipsis
          reflowOnResize
          ellipsisNode="..."
          {...other}
        />
      )}
    </EllipsisWrapper>
  );
};

export default Ellipsis;
