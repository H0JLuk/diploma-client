import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import { AuthLayout, RootLayout } from '@/components/Layouts';
import { HomePageContainer } from '@/containers/Home';
import { wrapper } from '@/store';
import { subjectApi } from '@/store/api/subjectApi';
import { commonApi } from '@/store/config/commonApi';

const Home: NextPage = () => (
  <>
    <Head>
      <title>Предметы для тестирования</title>
    </Head>
    <RootLayout>
      <AuthLayout pagePermission='common'>
        <HomePageContainer />
      </AuthLayout>
    </RootLayout>
  </>
);

export default Home;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async context => {
  store.dispatch(subjectApi.endpoints.getSubjects.initiate());
  await Promise.all(store.dispatch(commonApi.util.getRunningQueriesThunk()));

  return { props: {} };
});
