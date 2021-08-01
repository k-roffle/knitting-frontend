import { Layout } from 'dumbs';
import React from 'react';

import DesignTabs from './components/DesignTabs';
import MyInfo from './components/MyInfo';

const MyDesigns = (): React.ReactElement => {
  return (
    <Layout>
      <MyInfo />
      <DesignTabs />
    </Layout>
  );
};

export default MyDesigns;
