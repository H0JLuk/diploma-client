import React, { FC } from 'react';

import { Input, Loader } from '@/components/shared';
import { formatDateString } from '@/helpers/dateHelpers';
import { type AttemptResult } from '@/types';

type AttemptResultProps = {
  attemptResult?: AttemptResult;
  isFetching: boolean;
  isError: boolean;
  error?: string;
};

export const AttemptResultComponent: FC<AttemptResultProps> = ({ attemptResult, isFetching, isError, error }) => {
  if (isFetching) return <Loader />;
  if (isError || !attemptResult) return <p className='text-[red]'>{error}</p>;

  return (
    <div className='flex flex-col max-w-[450px] mx-auto'>
      <h1 className='text-3xl mt-2 mb-5 text-center'>Test: {attemptResult.test.name}</h1>
      {/* <h3 className='text-2xl mt-2 mb-5 text-center'>Test "{attemptResult.test.name}" attempt</h3> */}
      <p className='mb-5'>Started at: {formatDateString(attemptResult.testHistory.startedAt)}</p>
      <p className='mb-5'>Finished at: {formatDateString(attemptResult.testHistory.finishedAt!)}</p>

      <p className='mb-5'>
        Mark: {attemptResult.mark} ({attemptResult.totalRightPoints}/{attemptResult.test.questions?.length} points)
      </p>

      {attemptResult.test.questions?.map((question, index) => (
        <div key={question.id} className='mb-6'>
          <p className='font-bold'>
            {index + 1}. {question.text}
          </p>
          {question.type === 'single' && (
            <>
              {question.answers?.map(answer => (
                <div key={question.id}>
                  <Input
                    labelText={answer.text!}
                    type='radio'
                    checked={answer.id === question.testHistoryAnswer?.[0].answerId}
                    containerClassName={`inline-flex flex-row-reverse gap-2 ${
                      answer.isRight
                        ? question.testHistoryAnswer?.[0].answerId === answer.id
                          ? 'text-[green] font-bold'
                          : 'text-[red] font-bold'
                        : ''
                    }`}
                    disabled
                  />
                </div>
              ))}
            </>
          )}
          {question.type === 'input' && (
            <>
              <Input
                labelText='Answer'
                value={question.answers![0].text}
                customClass={
                  question.answers![0].text === question.testHistoryAnswer![0].textAnswer ? 'text-[green]' : ''
                }
                disabled
              />
              {question.answers![0].text !== question.testHistoryAnswer![0].textAnswer && (
                <Input
                  labelText='Your answer'
                  value={question.testHistoryAnswer![0].textAnswer}
                  customClass='text-[red] font-[bold]'
                  disabled
                />
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};
