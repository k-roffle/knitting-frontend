import React from 'react';

import KnitDesign from 'knitting/assets/designs/knit.png';

import { DesignImageWrapper } from './DesignSizeImage.css';

const DesignSizeImage = (): React.ReactElement => {
  return (
    <DesignImageWrapper>
      <img src={KnitDesign} />
    </DesignImageWrapper>
  );
};

export default DesignSizeImage;
