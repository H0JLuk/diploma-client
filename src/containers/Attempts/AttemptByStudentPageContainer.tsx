import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  type ChartData,
  type ChartOptions,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React, { FC } from 'react';
import { Bar } from 'react-chartjs-2';

import { AttemptList } from '@/components/Attempts';
import { useGetTestAttemptsByStudentIdQuery, useGetUserTestsStatsQuery } from '@/store/api/testAttemptApi';
import { useGetUserQuery } from '@/store/api/userApi';
import { User } from '@/types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

type PageContainerProps = {
  studentId: User['id'];
};

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Статистика оценок студента',
    },
  },
};

const labels = [2, 3, 4, 5] as [2, 3, 4, 5];

export const AttemptByStudentPageContainer: FC<PageContainerProps> = ({ studentId }) => {
  const {
    currentData: attemptsData,
    isFetching: isGetAttemptsFetching,
    isError: isGetAttemptsError,
    error: getAttemptsError,
  } = useGetTestAttemptsByStudentIdQuery(studentId);
  const { currentData: student } = useGetUserQuery(studentId);
  const { currentData: testsStats } = useGetUserTestsStatsQuery(studentId);

  const chartData: ChartData<'bar'> = {
    labels: labels,
    datasets: [{ data: testsStats ? labels.map(label => testsStats[label]) : [] }],
  };

  return (
    <main className='flex flex-col items-center flex-grow-[1]'>
      <h3 className='text-2xl mt-2 mb-5 text-center'>Список попыток у пользователя "{student?.name}"</h3>

      {testsStats && <Bar options={chartOptions} data={chartData} className='h-[250px]' height={80} />}

      <AttemptList
        isFetching={isGetAttemptsFetching}
        isError={isGetAttemptsError}
        error={getAttemptsError as string | undefined}
        testAttemptData={attemptsData}
      />
    </main>
  );
};
