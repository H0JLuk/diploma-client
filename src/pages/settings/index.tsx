import Head from 'next/head';
import React from 'react';

import { AuthLayout, RootLayout } from '@/components/Layouts';
import { SettingsPageContainer } from '@/containers/Settings';

const SettingsPage = () => (
  <>
    <Head>
      <title>Account settings</title>
    </Head>
    <AuthLayout pagePermission='student-methodist-admin'>
      <RootLayout>
        <Head>
          <title>Настройки профиля</title>
        </Head>
        <SettingsPageContainer />
      </RootLayout>
    </AuthLayout>
  </>
);

export default SettingsPage;
