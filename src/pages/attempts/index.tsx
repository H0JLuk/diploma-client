import Head from 'next/head';

import { AuthLayout, RootLayout } from '@/components/Layouts';
import { AttemptsPageContainer } from '@/containers/Attempts';

const AttemptsPage = () => (
  <>
    <Head>
      <title>My Attempts</title>
    </Head>
    <RootLayout>
      <AuthLayout pagePermission='student-methodist-admin'>
        <AttemptsPageContainer />
      </AuthLayout>
    </RootLayout>
  </>
);

export default AttemptsPage;
