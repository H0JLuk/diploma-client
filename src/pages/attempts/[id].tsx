import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import { AuthLayout, RootLayout } from '@/components/Layouts';
import { TestAttemptPageContainer } from '@/containers/Attempts';

type AttemptPageProps = {
  attemptId: number;
};

const AttemptPage: NextPage<AttemptPageProps> = ({ attemptId }) => (
  <>
    <Head>
      <title>Test attempt</title>
    </Head>
    <RootLayout>
      <AuthLayout pagePermission='student-methodist-admin'>
        <TestAttemptPageContainer attemptId={attemptId} />
      </AuthLayout>
    </RootLayout>
  </>
);

export default AttemptPage;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const attemptId = Number(ctx.query.id);

  return {
    notFound: !Number.isInteger(attemptId),
    props: {
      attemptId: attemptId,
    },
  };
};
