import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useCallback, useMemo } from 'react';

import { Routes } from '@/components/Navbar/navRoutes';
import { Button } from '@/components/shared';
import { TestList } from '@/components/Tests';
import { useCheckAuthQuery } from '@/store/api/authApi';
import { useGetSubjectQuery } from '@/store/api/subjectApi';
import { useDeleteTestMutation, useGetTestsQuery } from '@/store/api/testApi';
import { Test } from '@/types';

export const TestsPageContainer: FC = () => {
  const router = useRouter();
  const pageParams = useSearchParams();

  const subjectIdFromParams = Number.isInteger(Number(pageParams.get('subjectId')))
    ? +pageParams.get('subjectId')!
    : null;

  const {
    currentData: testData,
    isFetching: isGetTestFetching,
    isError: isGetTestsError,
  } = useGetTestsQuery(subjectIdFromParams);
  const { currentData: testSubject } = useGetSubjectQuery(subjectIdFromParams as number, {
    skip: !subjectIdFromParams,
  });
  const [deleteTestMutation, { isLoading: isDeleteTestLoading }] = useDeleteTestMutation();
  const { currentData: userInfo } = useCheckAuthQuery();

  const isNotStudent = !!userInfo && userInfo?.role !== 'Student';

  const isFetching = isDeleteTestLoading || isGetTestFetching;

  const handleCreateTest = () => router.push(`${Routes.TESTS}/create`);

  const handleEditTestClick = useCallback(
    (test: Test) => {
      router.push(`${Routes.TESTS}/edit/${test.id}`);
    },
    [router],
  );

  const testList = useMemo(
    () => (
      <TestList
        tests={testData}
        isFetching={isFetching}
        isError={isGetTestsError}
        isNotStudent={isNotStudent}
        onEditTest={handleEditTestClick}
        onDeleteTest={deleteTestMutation}
      />
    ),
    [deleteTestMutation, isFetching, isGetTestsError, isNotStudent, testData, handleEditTestClick],
  );

  if (!testSubject && subjectIdFromParams) {
    return <div>Incorrect subject :(</div>;
  }

  return (
    <main className='flex flex-col items-center flex-grow-[1]'>
      <h3 className='text-2xl mt-2 mb-5 text-center'>
        List of tests {!!testSubject && `by subject "${testSubject.name}"`}
      </h3>

      {isNotStudent && (
        <Button className='self-end' onClick={handleCreateTest}>
          Create new test
        </Button>
      )}

      {testList}
    </main>
  );
};
