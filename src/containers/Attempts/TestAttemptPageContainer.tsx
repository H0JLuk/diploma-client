import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

import { PassingAttempt } from '@/components/Attempts';
import { AttemptFormState } from '@/components/Attempts/PassingAttempt/formHelpers';
import { Routes } from '@/components/Navbar/navRoutes';
import { Loader } from '@/components/shared';
import { useFinishTestAttemptMutation, useGetTestAttemptQuery } from '@/store/api/testAttemptApi';

type PageProps = { attemptId: number };

export const TestAttemptPageContainer: FC<PageProps> = ({ attemptId }) => {
  const router = useRouter();

  const {
    isError: isGetAttemptError,
    error: getAttemptError,
    isFetching: isGetTestAttemptLoading,
    currentData: testAttempt,
  } = useGetTestAttemptQuery(attemptId);

  const [finishTestAttemptMutation, { isLoading: isFinishAttemptLoading }] = useFinishTestAttemptMutation();

  const handleSubmitAttempt = async (data: AttemptFormState) => {
    console.log('data :>> ', data);
    try {
      await finishTestAttemptMutation({ ...data, attemptId }).unwrap();
      router.push(`${Routes.ATTEMPTS}/results/${attemptId}`);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      {isGetTestAttemptLoading && <Loader />}
      {isGetAttemptError && getAttemptError && <p className='text-[red] text-[25px]'>{String(getAttemptError)}</p>}

      {testAttempt && (
        <PassingAttempt
          attempt={testAttempt.testHistory}
          test={testAttempt.test}
          isLoading={isFinishAttemptLoading}
          onSubmit={handleSubmitAttempt}
        />
      )}
    </>
  );
};
