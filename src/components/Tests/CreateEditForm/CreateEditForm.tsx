import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

import { Button, Input } from '@/components/shared';
import { useGetSubjectsQuery } from '@/store/api/subjectApi';

import { QuestionListForm } from './QuestionListForm';
import { TestFormValues } from './types';
import { validationSchema } from './validation';

type CreateEditTestFormProps = {
  defaultFormValues: TestFormValues;
  mode: 'create' | 'edit';
  onSave: (data: TestFormValues) => void;
};

export const CreateEditTestForm: FC<CreateEditTestFormProps> = ({ defaultFormValues, mode, onSave }) => {
  const { currentData: subjectData = [] } = useGetSubjectsQuery();

  const subjectOptions = useMemo(() => subjectData.map(({ id, name }) => ({ value: id, label: name })), [subjectData]);

  const formMethods = useForm<TestFormValues>({
    defaultValues: defaultFormValues,
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = (data: TestFormValues) => {
    console.log('data', data);
    onSave(data);
  };

  return (
    <form className='max-w-[450px] w-full flex flex-col pb-2' onSubmit={formMethods.handleSubmit(handleSubmit)}>
      <Input
        {...formMethods.register('name')}
        labelText='Title'
        autoComplete='off'
        customClass='w-full'
        placeholder='Type title...'
        id='name'
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor='subject-select'>
        <p className='mb-2'>Select subject </p>
        <Controller
          name='subjectId'
          control={formMethods.control}
          render={({ field }) => (
            <Select
              value={subjectOptions.find(subject => subject.value === field.value)}
              onChange={option => field.onChange(option!.value)}
              id='subject-select'
              name='subject'
              placeholder='Type subject...'
              ref={field.ref}
              options={subjectOptions}
            />
          )}
          rules={{ required: true }}
        />
        <p className='text-[red]'>{formMethods.formState.errors.subjectId?.message}</p>
      </label>
      <Input
        {...formMethods.register('startTime')}
        labelText='Testing start time'
        customClass='w-full'
        id='start-time'
        type='datetime-local'
        error={formMethods.formState.errors.startTime?.message}
      />
      <Input
        {...formMethods.register('endTime')}
        labelText='Testing end time'
        customClass='w-full'
        id='end-time'
        type='datetime-local'
        error={formMethods.formState.errors.endTime?.message}
      />
      <Input
        {...formMethods.register('duration')}
        labelText='Duration (in minutes)'
        customClass='w-full'
        placeholder='Type duration...'
        id='duration'
        type='number'
        error={formMethods.formState.errors.duration?.message}
      />
      <Input
        {...formMethods.register('isRandomAnswers')}
        containerClassName='flex items-center'
        labelText='Should questions and answers be sorted in random order?'
        customClass='w-[24px] h-[24px] min-w-[24px] ml-[auto]'
        type='checkbox'
        error={formMethods.formState.errors.isRandomAnswers?.message}
      />
      <Input
        {...formMethods.register('hidden')}
        containerClassName='flex items-center'
        labelText='Should test be hidden?'
        customClass='w-[24px] h-[24px] min-w-[24px] ml-[auto]'
        type='checkbox'
        error={formMethods.formState.errors.hidden?.message}
      />

      <h5 className='text-center text-[22px] mb-5'>Questions:</h5>

      <QuestionListForm formMethods={formMethods} />

      <Button type='submit' className='justify-center text-[20px] font-semibold'>
        {mode === 'create' ? 'Create test' : 'Edit test'}
      </Button>
    </form>
  );
};
