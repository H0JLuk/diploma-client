import { FC, useMemo } from 'react';

import { StudentList } from '@/components/Students';
import { useBanStudentMutation, useGetStudentsQuery } from '@/store/api/userApi';

export const StudentsPageContainer: FC = () => {
  const {
    currentData: studentsData,
    isError: isGetStudentsError,
    isFetching: isGetStudentsFetching,
  } = useGetStudentsQuery();

  const [banStudentMutation, { isLoading: isBanStudentLoading }] = useBanStudentMutation();

  const isFetching = isBanStudentLoading || isGetStudentsFetching;

  const studentsList = useMemo(
    () => (
      <StudentList
        students={studentsData}
        isFetching={isFetching}
        isError={isGetStudentsError}
        onBanStudent={banStudentMutation}
      />
    ),
    [studentsData, isFetching, isGetStudentsError, banStudentMutation],
  );

  return (
    <main className='flex flex-col items-center flex-grow-[1]'>
      <h3 className='text-2xl mt-2 mb-5 text-center'>Список студентов</h3>

      {studentsList}
    </main>
  );
};
