import { FC, memo } from 'react';
import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form';
import Select from 'react-select';

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

const questionTypeOptions = [
  { value: 'input', label: 'Текстовый вопрос' },
  { value: 'single', label: 'Выбор ответа' },
];

export const QuestionListForm: FC<QuestionListFormProps> = ({ formMethods }) => {
  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control: formMethods.control,
    name: 'questions',
  });

  const isRemoveBtnDisabled = formMethods.watch('questions').length < 2;

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

              <Button
                className='self-start ml-2 mt-9'
                disabled={isRemoveBtnDisabled}
                onClick={() => removeQuestion(index)}
              >
                X
              </Button>
            </div>

            <label className='mb-4 block' htmlFor={`question-${index}-type-select`}>
              <p className='mb-2'>Выберите тип вопроса</p>
              <Controller
                name={`questions.${index}.type`}
                control={formMethods.control}
                render={({ field }) => (
                  <Select
                    isSearchable={false}
                    defaultValue={questionTypeOptions.find(({ value }) => field.value === value)}
                    value={questionTypeOptions.find(option => option.value === field.value)}
                    onChange={option => field.onChange(option!.value)}
                    inputId={`question-${index}-type-select`}
                    name='type'
                    ref={field.ref}
                    options={questionTypeOptions}
                  />
                )}
                rules={{ required: true }}
              />
            </label>
            <AnswerListForm formMethods={formMethods} questionIndex={index} />
          </li>
        ))}
      </ul>

      <Button className='self-start' onClick={() => appendQuestion(defaultQuestion)}>
        Добавить вопрос
      </Button>
    </div>
  );
};
