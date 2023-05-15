import { FC } from 'react';

import { Test } from '@/types';

import { TestItem } from './TestItem';

type TestListProps = {
  tests?: Test[];
  isFetching: boolean;
  isError: boolean;
  hasMethodistPermissions: boolean;
  onEditTest: (test: Test) => void;
  onDeleteTest: (testId: number) => void;
};

export const TestList: FC<TestListProps> = ({
  tests,
  isFetching,
  isError,
  hasMethodistPermissions,
  onEditTest,
  onDeleteTest,
}) => (
  <>
    {isFetching && <p>Loading...</p>}
    {isError && <p>Oops, something went wrong...</p>}
    <div className='flex flex-col flex-wrap gap-4 md:flex-row justify-center justify-items-start items-center mt-2 w-full'>
      {tests?.map(test => (
        <TestItem
          test={test}
          key={test.id}
          isFetching={isFetching}
          hasMethodistPermissions={hasMethodistPermissions}
          onEditTest={onEditTest}
          onDeleteTest={onDeleteTest}
        />
      ))}
    </div>
  </>
);
