import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

import { Button, Input } from '@/components/shared';
import { useGetSubjectsQuery } from '@/store/api/subjectApi';
import { CreateTestDto, UpdateTestDto } from '@/types';

import { QuestionListForm } from './QuestionListForm';
import { TestFormValues } from './types';
import { validationSchema } from './validation';

type CreateEditTestFormProps = {
  defaultFormValues: TestFormValues;
  isLoading: boolean;
  mode: 'create' | 'edit';
  onSave: (data: CreateTestDto | UpdateTestDto) => void;
};

export const CreateEditTestForm: FC<CreateEditTestFormProps> = ({ defaultFormValues, isLoading, mode, onSave }) => {
  const { currentData: subjectData = [] } = useGetSubjectsQuery();

  const subjectOptions = useMemo(() => subjectData.map(({ id, name }) => ({ value: id, label: name })), [subjectData]);

  const formMethods = useForm<TestFormValues>({
    defaultValues: defaultFormValues,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    formMethods.reset(defaultFormValues);
  }, [defaultFormValues]);

  const handleSubmit = (data: TestFormValues) => {
    onSave({
      ...data,
      startTime: data.startTime.toISOString(),
      endTime: data.endTime.toISOString(),
      subjectId: data.subjectId!,
    });
  };

  return (
    <form className='max-w-[450px] w-full flex flex-col pb-2' onSubmit={formMethods.handleSubmit(handleSubmit)}>
      <Input
        {...formMethods.register('name')}
        labelText='Title'
        autoComplete='off'
        customClass='w-full'
        placeholder='Type title...'
        error={formMethods.formState.errors.name?.message}
        id='name'
      />

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
        value={formMethods.watch('startTime')?.toISOString?.().slice(0, 16)}
        labelText='Testing start time'
        customClass='w-full'
        id='start-time'
        type='datetime-local'
        error={formMethods.formState.errors.startTime?.message}
      />

      <Input
        {...formMethods.register('endTime')}
        value={formMethods.watch('endTime')?.toISOString?.().slice(0, 16)}
        labelText='Testing end time'
        customClass='w-full'
        id='end-time'
        type='datetime-local'
        error={formMethods.formState.errors.endTime?.message}
      />
      {/* <Input
        {...formMethods.register('duration')}
        labelText='Duration (in minutes)'
        customClass='w-full'
        placeholder='Type duration...'
        id='duration'
        type='number'
        error={formMethods.formState.errors.duration?.message}
      /> */}

      <Input
        {...formMethods.register('scoreFor3')}
        labelText='Points for "3"'
        customClass='w-full'
        placeholder='Type count of completed questions for 3 mark'
        id='min-3-score'
        type='number'
        error={formMethods.formState.errors.scoreFor3?.message}
      />

      <Input
        {...formMethods.register('scoreFor4')}
        labelText='Points for "4"'
        customClass='w-full'
        placeholder='Type count of completed questions for 4 mark...'
        id='min-4-score'
        type='number'
        error={formMethods.formState.errors.scoreFor4?.message}
      />

      <Input
        {...formMethods.register('scoreFor5')}
        labelText='Points for "5"'
        customClass='w-full'
        placeholder='Type count of completed questions for 5 mark...'
        id='min-5-score'
        type='number'
        error={formMethods.formState.errors.scoreFor5?.message}
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

      <Button type='submit' isLoading={isLoading} className='justify-center text-[20px] font-semibold'>
        {mode === 'create' ? 'Create test' : 'Edit test'}
      </Button>
    </form>
  );
};
