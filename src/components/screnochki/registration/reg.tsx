import React from 'react';
import Layout from '../../Layout/Layout';
import { SignUp } from '../../SignUp/SignUp';

const regPage: React.FC = () => {
  return (
    <Layout>
      <SignUp />
    </Layout>
  );
};

export default regPage;