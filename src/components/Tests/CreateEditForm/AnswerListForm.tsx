import { FC } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';

import { Button, Input } from '@/components/shared';

import { TestFormValues } from './types';

type AnswerListFormProps = {
  nestIndex: number;
  formMethods: UseFormReturn<TestFormValues, unknown>;
};

export const AnswerListForm: FC<AnswerListFormProps> = ({ nestIndex, formMethods }) => {
  const {
    fields: answerFields,
    remove: removeAnswer,
    append: appendAnswer,
  } = useFieldArray({
    control: formMethods.control,
    name: `questions.${nestIndex}.answers`,
  });

  return (
    <>
      <div className='ml-2 border-l-2 border-[red]'>
        {answerFields.map((item, index) => (
          <div key={item.id} className='flex ml-2'>
            <Input
              {...formMethods.register(`questions.${nestIndex}.answers.${index}.isRight`)}
              name={`questions.${nestIndex}.answers.isRight`}
              labelText=''
              type='radio'
            />

            <Input
              labelText=''
              containerClassName='mx-2 my-0.5'
              error={formMethods.formState.errors.questions?.[nestIndex]?.answers?.[index]?.text?.message}
              {...formMethods.register(`questions.${nestIndex}.answers.${index}.text`)}
            />
            <Button className='h-10 mt-6' onClick={() => removeAnswer(index)}>
              X
            </Button>
          </div>
        ))}

        <Button className='ml-2 mt-3' onClick={() => appendAnswer({ text: '', isRight: false })}>
          Append answer
        </Button>
      </div>
      <hr className='my-3' />
    </>
  );
};
