import React from 'react';

import { Icon } from './CountIcon.css';

type P = {
  count: number;
};

const CountIcon = ({ count }: P): React.ReactElement => {
  return <Icon>{count}</Icon>;
};

export default CountIcon;
