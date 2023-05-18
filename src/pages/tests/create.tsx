import Head from 'next/head';
import React from 'react';

import { AuthLayout, RootLayout } from '@/components/Layouts';
import { CreateTestPageContainer } from '@/containers/Tests';

const create = () => (
  <>
    <Head>
      <title>Create test</title>
    </Head>
    <RootLayout>
      <AuthLayout pagePermission='methodist-admin'>
        <CreateTestPageContainer />
      </AuthLayout>
    </RootLayout>
  </>
);

export default create;
