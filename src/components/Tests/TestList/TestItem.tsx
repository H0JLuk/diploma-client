import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { useCheckAuthQuery } from '@/store/api/authApi';
import { useStartTestAttemptMutation } from '@/store/api/testAttemptApi';
import { Test } from '@/types';

import { Routes } from '../../Navbar/navRoutes';
import { Button } from '../../shared';

type TestItemProps = {
  test: Test;
  isFetching: boolean;
  hasMethodistPermissions: boolean;
  onEditTest: (test: Test) => void;
  onDeleteTest: (testId: number) => void;
};

const cardColorByIndex = {
  0: '#FFFBEC',
  1: '#F9ECFF',
  2: '#ECEEFF',
};

export const TestItem: FC<TestItemProps> = ({
  test,
  isFetching,
  hasMethodistPermissions,
  onEditTest,
  onDeleteTest,
}) => {
  const { isSuccess: isAuthorized } = useCheckAuthQuery();
  const router = useRouter();

  const [startTestAttemptMutation, { isLoading: isStartTestAttemptLoading }] = useStartTestAttemptMutation();

  const handleTestPassingClick = async () => {
    const {
      testHistory: { id: testAttemptId },
    } = await startTestAttemptMutation(test.id).unwrap();
    router.push(`${Routes.ATTEMPTS}/${testAttemptId}`);
  };

  return (
    <div className='pr-5 pb-5 xs:max-w-[400px] w-full'>
      <div
        className={`bg-[${cardColorByIndex[(test.id % 3) as keyof typeof cardColorByIndex]}] rounded-xl`}
        key={test.id}
      >
        <div className='flex flex-col relative p-8 rounded-xl bg-white shadow-xl translate-x-4 translate-y-4 '>
          {hasMethodistPermissions && (
            <>
              <Button variant='clear' onClick={() => onEditTest(test)} className='absolute top-3 right-10'>
                &#9998;
              </Button>
              <Button
                variant='clear'
                disabled={isFetching}
                onClick={() => onDeleteTest(test.id)}
                className='absolute top-3 right-3'
              >
                &#x2715;
              </Button>
            </>
          )}
          <div className='mt-3 font-semibold text-lg'>{test.name}</div>

          {isAuthorized ? (
            <Button
              isLoading={isStartTestAttemptLoading}
              onClick={handleTestPassingClick}
              className='mt-4 self-start inline-block'
            >
              Start passing the test
            </Button>
          ) : (
            <p>For test passing you need log in</p>
          )}
        </div>
      </div>
    </div>
  );
};
