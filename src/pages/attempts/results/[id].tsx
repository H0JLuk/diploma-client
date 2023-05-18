import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import { AuthLayout, RootLayout } from '@/components/Layouts';
import { AttemptResultPageContainer } from '@/containers/Attempts/AttemptResultPageContainer';

type AttemptResultPageProps = {
  attemptId: number;
};

const AttemptResultPage: NextPage<AttemptResultPageProps> = ({ attemptId }) => (
  <>
    <Head>
      <title>Test attempt</title>
    </Head>
    <RootLayout>
      <AuthLayout pagePermission='student-methodist-admin'>
        <AttemptResultPageContainer attemptId={attemptId} />
      </AuthLayout>
    </RootLayout>
  </>
);

export default AttemptResultPage;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const attemptId = Number(ctx.query.id);

  return {
    notFound: !Number.isInteger(attemptId),
    props: {
      attemptId: attemptId,
    },
  };
};
