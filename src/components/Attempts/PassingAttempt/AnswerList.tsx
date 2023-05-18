import React, { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Input } from '@/components/shared';
import { Question } from '@/types';

import { AttemptFormState } from './formHelpers';

type AnswerListProps = {
  formMethods: UseFormReturn<AttemptFormState, unknown>;
  question: Question;
};

export const AnswerList: FC<AnswerListProps> = ({ formMethods, question }) => {
  const answerError = formMethods.formState.errors[question.id]?.message;

  return (
    <>
      {question.type === 'single' &&
        question.answers?.map(answer => (
          <div key={answer.id}>
            <Input
              {...formMethods.register(`${question.id}.answerId`)}
              type='radio'
              value={answer.id}
              containerClassName='inline-flex flex-row-reverse gap-2'
              labelText={answer.text!}
            />
          </div>
        ))}

      {question.type === 'input' && (
        <Input {...formMethods.register(`${question.id}.answer`)} labelText='Enter answer...' />
      )}

      {answerError && <p className='text-[red]'>{answerError}</p>}
    </>
  );
};
