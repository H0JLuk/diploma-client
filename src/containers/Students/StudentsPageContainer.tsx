import { FC, useMemo } from 'react';

import { StudentList } from '@/components/Students';
import { useBanUserMutation, useGetUsersQuery } from '@/store/api/userApi';

export const StudentsPageContainer: FC = () => {
  const { currentData: usersData, isError: isGetUsersError, isFetching: isGetUsersFetching } = useGetUsersQuery();

  const [banUserMutation, { isLoading: isBanUserLoading }] = useBanUserMutation();

  const isFetching = isBanUserLoading || isGetUsersFetching;

  const studentsList = useMemo(
    () => (
      <StudentList students={usersData} isFetching={isFetching} isError={isGetUsersError} onBanUser={banUserMutation} />
    ),
    [usersData, isFetching, isGetUsersError, banUserMutation],
  );

  return (
    <main className='flex flex-col items-center flex-grow-[1]'>
      <h3 className='text-2xl mt-2 mb-5 text-center'>List of students</h3>

      {studentsList}
    </main>
  );
};
