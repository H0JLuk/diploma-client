import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

import { AuthLayout, RootLayout } from '@/components/Layouts';
import { EditTestPageContainer } from '@/containers/Tests';

type EditTestProps = { testId: number };

const EditTest: NextPage<EditTestProps> = ({ testId }) => (
  <>
    <Head>
      <title>Edit test</title>
    </Head>
    <RootLayout>
      <AuthLayout pagePermission='methodist-admin'>
        <EditTestPageContainer testId={testId} />
      </AuthLayout>
    </RootLayout>
  </>
);

export default EditTest;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { params } = ctx;
  const testId = Number(params?.id);

  return {
    notFound: !Number.isInteger(testId),
    props: {
      testId,
    },
  };
};
