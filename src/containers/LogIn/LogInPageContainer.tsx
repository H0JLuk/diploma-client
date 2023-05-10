'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input } from '@/components/shared';
import { useLogInMutation } from '@/store/api/authApi';

import { initLogInFormData, LogInFormData, signUpFields } from './inputFields';
import { validationSchema } from './validation';

export const LogInPageContainer: FC = () => {
  const { register, handleSubmit, formState } = useForm<LogInFormData>({
    defaultValues: initLogInFormData,
    resolver: yupResolver(validationSchema),
  });

  const [logInMutation, { error, isLoading, isError }] = useLogInMutation();

  const handleSubmitQuery: Parameters<typeof handleSubmit>[0] = async (data, e) => {
    const { login, password } = data;
    logInMutation({ login, password });
  };

  return (
    <div className='flex justify-center items-center flex-grow-[1]'>
      <form className='m-8' onSubmit={handleSubmit(handleSubmitQuery)}>
        {Object.entries(signUpFields).map(([name, field]) => (
          <Input {...field} {...register(name)} key={field.id} error={formState.errors[name]?.message} />
        ))}

        {isError && <p className='text-[red]'>{String(error)}</p>}
        <Button type='submit' isLoading={isLoading}>
          Sign&nbsp;up
        </Button>
      </form>
    </div>
  );
};
