import React from 'react';

import { Icon } from './CountIcon.css';

type Props = {
  count: number;
};

const CountIcon = ({ count }: Props): React.ReactElement => {
  return <Icon>{count}</Icon>;
};

export default CountIcon;
