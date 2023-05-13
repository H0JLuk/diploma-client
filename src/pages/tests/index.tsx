import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { AuthLayout, RootLayout } from '@/components/Layouts';
import { TestsPageContainer } from '@/containers/Tests';
import { wrapper } from '@/store';
import { subjectApi } from '@/store/api/subjectApi';
import { testApi } from '@/store/api/testApi';
import { commonApi } from '@/store/config/commonApi';

const TestsPage = () => (
  <>
    <Head>
      <title>List of tests</title>
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

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async context => {
  const subjectId = Number.isInteger(Number(context.query?.subjectId)) ? +context.query!.subjectId! : null;

  if (subjectId) {
    store.dispatch(subjectApi.endpoints.getSubject.initiate(subjectId));
  }
  store.dispatch(testApi.endpoints.getTests.initiate(subjectId));
  await Promise.all(store.dispatch(commonApi.util.getRunningQueriesThunk()));

  return { props: {} };
});
