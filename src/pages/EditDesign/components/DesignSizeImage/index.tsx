import KnitDesign from 'knitting/assets/designs/knit.png';

import React from 'react';

import { DesignImageWrapper } from './DesignSizeImage.css';

const DesignSizeImage = (): React.ReactElement => {
  return (
    <DesignImageWrapper>
      <img src={KnitDesign} />
    </DesignImageWrapper>
  );
};

export default DesignSizeImage;
