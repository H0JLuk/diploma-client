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
  const { currentData: userInfo, isSuccess: isAuthorized } = useCheckAuthQuery();

  const filteredTestList = useMemo(
    () =>
      testData?.filter(test => {
        if (!isAuthorized || userInfo!.role === 'Student') {
          const isStartDateStarted = new Date(test.startTime) < new Date();
          const isEndDateNotFinished = new Date(test.endTime) > new Date();
          return isStartDateStarted && isEndDateNotFinished && !test.hidden;
        }
        return true;
      }),
    [testData, userInfo, isAuthorized],
  );

  const hasMethodistPermissions = isAuthorized && !!userInfo && userInfo?.role !== 'Student';

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
        tests={filteredTestList}
        isFetching={isFetching}
        isError={isGetTestsError}
        hasMethodistPermissions={hasMethodistPermissions}
        onEditTest={handleEditTestClick}
        onDeleteTest={deleteTestMutation}
      />
    ),
    [deleteTestMutation, isFetching, isGetTestsError, hasMethodistPermissions, filteredTestList, handleEditTestClick],
  );

  if (!testSubject && subjectIdFromParams) {
    return <div>Неверный предмет :(</div>;
  }

  return (
    <main className='flex flex-col items-center flex-grow-[1]'>
      <h3 className='text-2xl mt-2 mb-5 text-center'>
        Список тестов {!!testSubject && `по предмету "${testSubject.name}"`}
      </h3>

      {hasMethodistPermissions && (
        <Button className='self-end' onClick={handleCreateTest}>
          Создать новый тест
        </Button>
      )}

      {testList}
    </main>
  );
};
