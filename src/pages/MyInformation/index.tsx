import { Layout } from 'knitting/dumbs';

import React from 'react';

import MyInformationTabs from './components/InformationTabs';
import MyProfile from './components/MyProfile';

const MyInformation = (): React.ReactElement => {
  return (
    <Layout>
      <MyProfile />
      <MyInformationTabs />
    </Layout>
  );
};

export default MyInformation;
