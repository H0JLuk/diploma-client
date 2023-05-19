import Head from 'next/head';

import { AuthLayout, RootLayout } from '@/components/Layouts';
import { SignUpPageContainer } from '@/containers/SignUp';

const SignUpPage = () => (
  <>
    <Head>
      <title>Регистрация</title>
      <meta name='description' content='Registration page for system of testing knowledge' />
    </Head>
    <RootLayout>
      <AuthLayout pagePermission='unauthorized'>
        <SignUpPageContainer />
      </AuthLayout>
    </RootLayout>
  </>
);

export default SignUpPage;
