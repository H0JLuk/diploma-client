import { FC } from 'react';

import { Subject } from '@/types';

import { SubjectItem } from './SubjectItem';

type SubjectListProps = {
  subjects?: Subject[];
  isFetching: boolean;
  isError: boolean;
  hasMethodistPermissions: boolean;
  onEditSubject: (subject: Subject) => void;
  onDeleteSubject: (subjectId: number) => void;
};

export const SubjectList: FC<SubjectListProps> = ({
  subjects,
  isFetching,
  isError,
  hasMethodistPermissions,
  onEditSubject,
  onDeleteSubject,
}) => (
  <>
    {isFetching && <p>Loading...</p>}
    {isError && <p>Oops, something went wrong...</p>}
    <div className='flex flex-col flex-wrap gap-4 md:flex-row justify-center justify-items-start items-center mt-2 w-full'>
      {subjects?.map(subject => (
        <SubjectItem
          subject={subject}
          key={subject.id}
          isFetching={isFetching}
          hasMethodistPermissions={hasMethodistPermissions}
          onEditSubject={onEditSubject}
          onDeleteSubject={onDeleteSubject}
        />
      ))}
    </div>
  </>
);
