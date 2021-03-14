import React from 'react';

import Detail from './Detail';
import Pattern from './Pattern';
import Review from './Review';

const CreateDesign = (): React.ReactElement => {
  return (
    <div>
      <Detail />
      <Pattern />
      <Review />
    </div>
  );
};

export default CreateDesign;
