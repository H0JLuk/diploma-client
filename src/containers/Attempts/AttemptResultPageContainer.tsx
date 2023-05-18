import React, { FC } from 'react';

import { AttemptResult } from '@/components/Attempts';
import { useGetTestAttemptResultQuery } from '@/store/api/testAttemptApi';

type ResultPageProps = {
  attemptId: number;
};

export const AttemptResultPageContainer: FC<ResultPageProps> = ({ attemptId }) => {
  const { currentData: attemptResult, isFetching, isError, error } = useGetTestAttemptResultQuery(attemptId);

  return (
    <AttemptResult
      attemptResult={attemptResult}
      isFetching={isFetching}
      isError={isError}
      error={error as string | undefined}
    />
  );
};
