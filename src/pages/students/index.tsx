import Head from 'next/head';

import { AuthLayout, RootLayout } from '@/components/Layouts';
import { StudentsPageContainer } from '@/containers/Students';

const StudentsPage = () => (
  <>
    <Head>
      <title>List of students</title>
      <meta name='description' content='Tests by subject page for system of testing knowledge' />
    </Head>
    <RootLayout>
      <AuthLayout pagePermission='methodist-admin'>
        <StudentsPageContainer />
      </AuthLayout>
    </RootLayout>
  </>
);

export default StudentsPage;
