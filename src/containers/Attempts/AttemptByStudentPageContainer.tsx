import React, { FC } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

import { AttemptList } from '@/components/Attempts';
import { useGetTestAttemptsByStudentIdQuery, useGetUserTestsStatsQuery } from '@/store/api/testAttemptApi';
import { useGetUserQuery } from '@/store/api/userApi';
import { User } from '@/types';

type PageContainerProps = {
  studentId: User['id'];
};

const colorByMarks = {
  2: 'red',
  3: 'yellow',
  4: 'orange',
  5: 'green',
};

export const AttemptByStudentPageContainer: FC<PageContainerProps> = ({ studentId }) => {
  const {
    currentData: attemptsData,
    isFetching: isGetAttemptsFetching,
    isError: isGetAttemptsError,
    error: getAttemptsError,
  } = useGetTestAttemptsByStudentIdQuery(studentId);
  const { currentData: student } = useGetUserQuery(studentId);
  const { currentData: testsStats } = useGetUserTestsStatsQuery(studentId);

  return (
    <main className='flex flex-col items-center flex-grow-[1]'>
      <h3 className='text-2xl mt-2 mb-5 text-center'>Список попыток у пользователя "{student?.name}"</h3>

      {testsStats && (
        <PieChart
          data={Object.entries(testsStats).map(([mark, value]) => ({
            color: colorByMarks[mark],
            value,
            title: `${mark}`,
          }))}
          labelPosition={50}
          className='max-w-[250px]'
          label={props => {
            const { title, percentage } = props.dataEntry;
            return !!percentage && `${title} - ${percentage.toFixed(2)}%`;
          }}
          labelStyle={{
            fontSize: '6px',
            fontFamily: 'sans-serif',
            fill: '#121212',
          }}
          animate
        />
      )}

      <AttemptList
        isFetching={isGetAttemptsFetching}
        isError={isGetAttemptsError}
        error={getAttemptsError as string | undefined}
        testAttemptData={attemptsData}
      />
    </main>
  );
};
