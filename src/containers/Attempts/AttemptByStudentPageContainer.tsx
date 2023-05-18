import React, { FC } from 'react';

import { AttemptList } from '@/components/Attempts';
import { useGetTestAttemptsByStudentIdQuery } from '@/store/api/testAttemptApi';
import { useGetUserQuery } from '@/store/api/userApi';
import { User } from '@/types';

type PageContainerProps = {
  studentId: User['id'];
};

export const AttemptByStudentPageContainer: FC<PageContainerProps> = ({ studentId }) => {
  const {
    currentData: attemptsData,
    isFetching: isGetAttemptsFetching,
    isError: isGetAttemptsError,
    error: getAttemptsError,
  } = useGetTestAttemptsByStudentIdQuery(studentId);
  const { currentData: student } = useGetUserQuery(studentId);

  return (
    <main className='flex flex-col items-center flex-grow-[1]'>
      <h3 className='text-2xl mt-2 mb-5 text-center'>List of attempts by user {student?.name}</h3>

      <AttemptList
        isFetching={isGetAttemptsFetching}
        isError={isGetAttemptsError}
        error={getAttemptsError as string | undefined}
        testAttemptData={attemptsData}
      />
    </main>
  );
};
