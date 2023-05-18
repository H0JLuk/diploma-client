import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import { AuthLayout, RootLayout } from '@/components/Layouts';
import { AttemptByStudentPageContainer } from '@/containers/Attempts';
import { User } from '@/types';

type AttemptPageProps = {
  studentId: User['id'];
};

const AttemptByStudentPage: NextPage<AttemptPageProps> = ({ studentId }) => (
  <>
    <Head>
      <title>Test attempt by user</title>
    </Head>
    <RootLayout>
      <AuthLayout pagePermission='methodist-admin'>
        <AttemptByStudentPageContainer studentId={studentId} />
      </AuthLayout>
    </RootLayout>
  </>
);

export default AttemptByStudentPage;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const studentId = Number(ctx.query.id);

  return {
    notFound: !Number.isInteger(studentId),
    props: {
      studentId,
    },
  };
};
