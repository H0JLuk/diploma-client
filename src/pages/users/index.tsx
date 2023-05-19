import Head from 'next/head';

import { AuthLayout, RootLayout } from '@/components/Layouts';
import { UsersPageContainer } from '@/containers/Users';

const UsersPage = () => (
  <>
    <Head>
      <title>Список пользователей</title>
      <meta name='description' content='Tests by subject page for system of testing knowledge' />
    </Head>
    <RootLayout>
      <AuthLayout pagePermission='admin'>
        <UsersPageContainer />
      </AuthLayout>
    </RootLayout>
  </>
);

export default UsersPage;
