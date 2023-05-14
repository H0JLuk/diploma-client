import { FC } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';

import { Button, Input } from '@/components/shared';

import { AnswerListForm } from './AnswerListForm';
import { TestFormValues } from './types';

type QuestionListFormProps = {
  formMethods: UseFormReturn<TestFormValues, unknown>;
};

const defaultQuestion: TestFormValues['questions'][number] = {
  text: '',
  type: 'single',
  answers: [{ text: '', isRight: true }],
};

export const QuestionListForm: FC<QuestionListFormProps> = ({ formMethods }) => {
  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control: formMethods.control,
    name: 'questions',
  });

  return (
    <div className='mb-2'>
      <ul>
        {questionFields.map((item, index) => (
          <li key={item.id}>
            <div className='flex'>
              <Input
                {...formMethods.register(`questions.${index}.text`)}
                customClass='w-full'
                error={formMethods.formState.errors.questions?.[index]?.text?.message}
                containerClassName='w-full'
                labelText={`${index + 1} question`}
              />

              <Button className='self-start ml-2 mt-9' onClick={() => removeQuestion(index)}>
                X
              </Button>
            </div>

            <AnswerListForm formMethods={formMethods} nestIndex={index} />
          </li>
        ))}
      </ul>

      <Button className='self-start' onClick={() => appendQuestion(defaultQuestion)}>
        Add question
      </Button>
    </div>
  );
};
