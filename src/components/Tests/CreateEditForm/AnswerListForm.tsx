import { FC } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';

import { Button, Input } from '@/components/shared';

import { TestFormValues } from './types';

const defaultAnswer = { text: '', isRight: false };

type AnswerListFormProps = {
  questionIndex: number;
  formMethods: UseFormReturn<TestFormValues, unknown>;
};

export const AnswerListForm: FC<AnswerListFormProps> = ({ questionIndex, formMethods }) => {
  const {
    fields: answerFields,
    remove: removeAnswer,
    append: appendAnswer,
  } = useFieldArray({
    control: formMethods.control,
    name: `questions.${questionIndex}.answers`,
  });
  const handleChangeRightAnswer = (answerIndex: number) => {
    const answersState = formMethods.getValues(`questions.${questionIndex}.answers`);
    const newAnswerState = answersState.map((answer, index) => ({
      ...answer,
      isRight: index === answerIndex,
    }));
    formMethods.setValue(`questions.${questionIndex}.answers`, newAnswerState);
  };

  const borderColor = (() => {
    const isDirty = formMethods.formState.dirtyFields.questions?.[questionIndex]?.text;
    const ifErrorBorderColor = formMethods.formState.errors.questions?.length ? 'red' : 'lightgreen';
    return !isDirty ? 'lightgrey' : ifErrorBorderColor;
  })();

  const answers = formMethods.watch(`questions.${questionIndex}.answers`);
  const isRemoveBtnDisabled = answers.length < 2;

  return (
    <>
      <div className='ml-2 border-l-2' style={{ borderColor }}>
        {answerFields.map((item, index) => (
          <div key={item.id} className='flex ml-2'>
            <Input
              name={`questions.${questionIndex}.answers.isRight`}
              onChange={() => handleChangeRightAnswer(index)}
              labelText=''
              checked={answers[index].isRight}
              type='radio'
              containerClassName='mt-6'
            />

            <Input
              labelText=''
              containerClassName='mx-2 my-0.5 grow-[1]'
              customClass='w-full'
              error={formMethods.formState.errors.questions?.[questionIndex]?.answers?.[index]?.text?.message}
              {...formMethods.register(`questions.${questionIndex}.answers.${index}.text`)}
            />
            <Button disabled={isRemoveBtnDisabled} className='h-10 mt-8' onClick={() => removeAnswer(index)}>
              X
            </Button>
          </div>
        ))}

        <p className='ml-2 text-[red]'>{formMethods.formState.errors.questions?.[questionIndex]?.answers?.message}</p>
        <Button className='ml-2 mt-3' onClick={() => appendAnswer(defaultAnswer)}>
          Append answer
        </Button>
      </div>
      <hr className='my-3' />
    </>
  );
};
