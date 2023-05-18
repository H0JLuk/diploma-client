import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input } from '@/components/shared';
import { formatDateString } from '@/helpers/dateHelpers';
import { Test } from '@/types';
import { TestAttempt } from '@/types/testAttempt';

import { AnswerList } from './AnswerList';
import { AttemptFormState, fromTestToFormState } from './formHelpers';
import { validationSchema } from './validation';

type PassingAttemptProps = {
  test: Test;
  attempt: TestAttempt;
  isLoading: boolean;
  onSubmit(data: AttemptFormState): void;
};

export const PassingAttempt: FC<PassingAttemptProps> = ({ test, attempt, isLoading, onSubmit }) => {
  const formMethods = useForm<AttemptFormState>({
    defaultValues: fromTestToFormState(test.questions!),
    resolver: yupResolver(validationSchema as any),
  });

  return (
    <div className='flex flex-col max-w-[450px] mx-auto'>
      <h1 className='text-3xl mt-2 mb-5 text-center'>Subject: {test.subject?.name}</h1>
      <h3 className='text-2xl mt-2 mb-5 text-center'>Test "{test.name}" attempt</h3>
      <p className='mb-5'>Started at: {formatDateString(attempt.startedAt)}</p>

      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        {test.questions?.map((question, index) => (
          <div className='' key={question.id}>
            <p className='font-medium text-[18px]'>
              {index + 1}. {question.text}
            </p>

            <AnswerList formMethods={formMethods} question={question} />

            <hr className='my-3' />
          </div>
        ))}

        <Button type='submit' isLoading={isLoading} className='justify-center text-[20px] font-semibold my-4'>
          Finish test and save answers
        </Button>
      </form>
    </div>
  );
};
