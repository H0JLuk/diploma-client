import Head from 'next/head';
import { FC } from 'react';

import { AuthLayout, RootLayout } from '@/components/Layouts';
import { LogInPageContainer } from '@/containers/LogIn';

const LogInPage: FC = () => (
  <>
    <Head>
      <title>Log In</title>
      <meta name='description' content='Authorization page for system of testing knowledge' />
    </Head>
    <RootLayout>
      <AuthLayout pagePermission='unauthorized'>
        <LogInPageContainer />
      </AuthLayout>
    </RootLayout>
  </>
);

export default LogInPage;
