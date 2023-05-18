import React, { FC } from 'react';

import { Loader } from '@/components/shared';
import { Test } from '@/types';
import { TestAttempt } from '@/types/testAttempt';

import { AttemptItem } from './AttemptItem';

type AttemptListProps = {
  testAttemptData?: Array<{ test: Test; testHistory: TestAttempt }>;
  isFetching: boolean;
  isError: boolean;
  error?: string;
};

export const AttemptList: FC<AttemptListProps> = ({ testAttemptData, isFetching, isError, error }) => (
  <>
    {isFetching && <Loader />}

    {isError && <p className='text-[red]'>{error}</p>}
    {testAttemptData && (
      <div className='flex flex-col flex-wrap gap-4 md:flex-row justify-center justify-items-start items-center mt-2 w-full'>
        {testAttemptData.map(({ test, testHistory }) => (
          <AttemptItem test={test} attempt={testHistory} key={test.id + ':' + testHistory.id} />
        ))}
      </div>
    )}
  </>
);
