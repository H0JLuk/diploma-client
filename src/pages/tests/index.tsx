import Head from 'next/head';

import { AuthLayout, RootLayout } from '@/components/Layouts';
import { TestsPageContainer } from '@/containers/Tests';

const TestsPage = () => (
  <>
    <Head>
      <title>Tests list</title>
      <meta name='description' content='Tests by subject page for system of testing knowledge' />
    </Head>
    <RootLayout>
      <AuthLayout pagePermission='common'>
        <TestsPageContainer />
      </AuthLayout>
    </RootLayout>
  </>
);

export default TestsPage;
