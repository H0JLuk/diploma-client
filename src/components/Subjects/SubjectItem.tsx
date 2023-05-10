import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Test } from '@/types';

import { Routes } from '../Navbar/navRoutes';
import { Button } from '../shared';

type SubjectItemProps = {
  subject: Test;
  isFetching: boolean;
  isNotStudent: boolean;
  onEditSubject: (subject: Test) => void;
  onDeleteSubject: (subjectId: number) => void;
};

const cardColorByIndex = {
  0: '#FFFBEC',
  1: '#F9ECFF',
  2: '#ECEEFF',
};

export const SubjectItem: FC<SubjectItemProps> = ({
  subject,
  isFetching,
  isNotStudent,
  onEditSubject,
  onDeleteSubject,
}) => {
  const router = useRouter();

  return (
    <div className='pr-5 pb-5 xs:max-w-[400px] w-full'>
      <div
        className={`bg-[${cardColorByIndex[(subject.id % 3) as keyof typeof cardColorByIndex]}] rounded-xl`}
        key={subject.id}
      >
        <div className='flex flex-col relative p-8 rounded-xl bg-white shadow-xl translate-x-4 translate-y-4 '>
          {isNotStudent && (
            <Button variant='clear' onClick={() => onEditSubject(subject)} className='absolute top-3 right-10'>
              &#9998;
            </Button>
          )}
          <Button
            variant='clear'
            disabled={isFetching}
            onClick={() => onDeleteSubject(subject.id)}
            className='absolute top-3 right-3'
          >
            &#x2715;
          </Button>

          <div className='mt-3 font-semibold text-lg'>{subject.name}</div>
          {/* <div className='text-sm font-light w-60 md:w-auto'>Unlimited calls</div> */}

          <Button
            onClick={() => router.push(`${Routes.TESTS}/?subjectId=${subject.id}`)}
            className='mt-4 self-start inline-block'
          >
            Открыть тесты
          </Button>
        </div>
      </div>
    </div>
  );
};
