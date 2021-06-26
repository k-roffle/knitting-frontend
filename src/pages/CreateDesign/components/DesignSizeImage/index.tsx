import KnitDesign from 'assets/designs/knit.png';
import React from 'react';
import styled from 'styled-components';

const DesignImageWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 450px;
    margin-top: 8px;
  }
`;

const DesignSizeImage = (): React.ReactElement => {
  return (
    <DesignImageWrapper>
      <img src={KnitDesign} />
    </DesignImageWrapper>
  );
};

export default DesignSizeImage;
