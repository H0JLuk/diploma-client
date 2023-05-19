import { FC } from 'react';

import { AttemptList } from '@/components/Attempts';
import { useGetTestAttemptsQuery } from '@/store/api/testAttemptApi';

export const AttemptsPageContainer: FC = () => {
  const {
    currentData: attemptsData,
    isFetching: isGetAttemptsFetching,
    isError: isGetAttemptsError,
    error: getAttemptsError,
  } = useGetTestAttemptsQuery();

  return (
    <main className='flex flex-col items-center flex-grow-[1]'>
      <h3 className='text-2xl mt-2 mb-5 text-center'>Список попыток</h3>

      <AttemptList
        isFetching={isGetAttemptsFetching}
        isError={isGetAttemptsError}
        error={getAttemptsError as string | undefined}
        testAttemptData={attemptsData}
      />
    </main>
  );
};
