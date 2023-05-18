import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { User } from '@/types';

import { Routes } from '../Navbar/navRoutes';
import { Button } from '../shared';

type StudentItemProps = {
  student: User;
  isFetching: boolean;
  onBanStudent: (studentId: number) => void;
};

const cardColorByIndex = {
  0: '#FFFBEC',
  1: '#F9ECFF',
  2: '#ECEEFF',
};

export const StudentItem: FC<StudentItemProps> = ({ student, isFetching, onBanStudent }) => {
  const router = useRouter();

  return (
    <div className='pr-5 pb-5 xs:max-w-[400px] w-full'>
      <div
        className={`bg-[${cardColorByIndex[(student.id % 3) as keyof typeof cardColorByIndex]}] rounded-xl`}
        key={student.id}
      >
        <div className='flex flex-col relative p-8 rounded-xl bg-white shadow-xl translate-x-4 translate-y-4 '>
          <Button
            variant='clear'
            disabled={isFetching}
            onClick={() => onBanStudent(student.id)}
            className='absolute top-3 right-3'
          >
            &#x2715;
          </Button>

          <div className='mt-3 font-semibold text-lg'>Name: {student.name}</div>

          <Button
            onClick={() => router.push(`${Routes.ATTEMPTS}/users/${student.id}`)}
            className='mt-4 self-start inline-block'
          >
            Open test statistics
          </Button>
        </div>
      </div>
    </div>
  );
};
