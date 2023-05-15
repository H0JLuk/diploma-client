import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Subject } from '@/types';

import { Routes } from '../Navbar/navRoutes';
import { Button } from '../shared';

type SubjectItemProps = {
  subject: Subject;
  isFetching: boolean;
  hasMethodistPermissions: boolean;
  onEditSubject: (subject: Subject) => void;
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
  hasMethodistPermissions,
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
          {hasMethodistPermissions && (
            <>
              <Button variant='clear' onClick={() => onEditSubject(subject)} className='absolute top-3 right-10'>
                &#9998;
              </Button>
              <Button
                variant='clear'
                disabled={isFetching}
                onClick={() => onDeleteSubject(subject.id)}
                className='absolute top-3 right-3'
              >
                &#x2715;
              </Button>
            </>
          )}

          <div className='mt-3 font-semibold text-lg'>{subject.name}</div>
          {!!subject.testsLength && (
            <div className='text-sm font-light'>
              {subject.testsLength} test{subject.testsLength > 1 && 's'}
            </div>
          )}

          <Button
            onClick={() => router.push(`${Routes.TESTS}/?subjectId=${subject.id}`)}
            className='mt-4 self-start inline-block'
          >
            Open tests
          </Button>
        </div>
      </div>
    </div>
  );
};
