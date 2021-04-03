import { withKnobs, radios } from '@storybook/addon-knobs';
import React from 'react';

import Button from '.';

export default {
  title: 'Dumbs/Button',
  component: Button,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: 'Mui 버튼에 side props를 추가한 컴포넌트 입니다.',
  },
};

export const Basic = (): React.ReactElement => {
  const side = radios(
    'side',
    {
      left: 'LEFT',
      right: 'RIGHT',
    },
    'LEFT',
  );

  return <Button label="side" side={side}></Button>;
};
