import { FC } from 'react';

import { User } from '@/types';

import { StudentItem } from './StudentItem';

type StudentListProps = {
  students?: User[];
  isFetching: boolean;
  isError: boolean;
  onBanStudent: (userId: number) => void;
};

export const StudentList: FC<StudentListProps> = ({ students, isFetching, isError, onBanStudent }) => (
  <>
    {isFetching && <p>Loading...</p>}
    {isError && <p>Oops, something went wrong...</p>}
    <div className='flex flex-col flex-wrap gap-4 md:flex-row justify-center justify-items-start items-center mt-2 w-full'>
      {students?.map(student => (
        <StudentItem student={student} key={student.id} isFetching={isFetching} onBanStudent={onBanStudent} />
      ))}
    </div>
  </>
);
