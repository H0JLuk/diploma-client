import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Routes } from '@/components/Navbar/navRoutes';
import { Button } from '@/components/shared';
import { formatDateString } from '@/helpers/dateHelpers';
import { useCheckAuthQuery } from '@/store/api/authApi';
import { Test, TestAttempt } from '@/types';

type AttemptItemProps = {
  test: Test;
  attempt: TestAttempt;
};

const cardColorByIndex = {
  0: '#FFFBEC',
  1: '#F9ECFF',
  2: '#ECEEFF',
};

export const AttemptItem: FC<AttemptItemProps> = ({ attempt, test }) => {
  const router = useRouter();
  const { currentData: authInfo } = useCheckAuthQuery();

  return (
    <div className='pr-5 pb-5 xs:max-w-[400px] w-full'>
      <div className={`bg-[${cardColorByIndex[(attempt.id % 3) as keyof typeof cardColorByIndex]}] rounded-xl`}>
        <div className='flex flex-col relative p-8 rounded-xl bg-white shadow-xl translate-x-4 translate-y-4 '>
          <p className='mt-3 font-semibold text-lg mb-1'>Test: {test.name}</p>
          <p className='text-sm font-light mb-1'>Started at: {formatDateString(attempt.startedAt)}</p>
          <p className='text-sm font-light'>
            {attempt.finishedAt
              ? `Test attempt was finished at ${formatDateString(attempt.finishedAt)}`
              : 'Test is not finished yet'}
          </p>

          {authInfo?.id === attempt.studentId && !attempt.finishedAt && (
            <Button
              onClick={() => router.push(`${Routes.ATTEMPTS}/${attempt.id}`)}
              className='mt-4 self-start inline-block'
            >
              Continue test
            </Button>
          )}
          {attempt.finishedAt && (
            <Button
              onClick={() => router.push(`${Routes.ATTEMPTS}/results/${attempt.id}`)}
              className='mt-4 self-start inline-block'
            >
              Check results
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
