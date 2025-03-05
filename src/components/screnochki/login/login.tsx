import React from 'react';
import Layout from '../../Layout/Layout';
import { SignIn } from '../../SignIn/SignIn';

const LoginPage: React.FC = () => {
  return (
    <Layout>
      <SignIn />
    </Layout>
  );
};

export default LoginPage;