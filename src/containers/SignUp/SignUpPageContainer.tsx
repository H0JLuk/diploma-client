'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input } from '@/components/shared';
import { useSignUpMutation } from '@/store/api/authApi';

import { initSignUpFormData, signUpFields, SignUpFormData } from './inputFields';
import { validationSchema } from './validation';

export const SignUpPageContainer: FC = () => {
  const { register, handleSubmit, formState } = useForm<SignUpFormData>({
    defaultValues: initSignUpFormData,
    resolver: yupResolver(validationSchema),
  });

  const [signUpMutation, { error, isLoading, isError }] = useSignUpMutation();

  const handleSubmitQuery: Parameters<typeof handleSubmit>[0] = async data => {
    const { login, name, password } = data;
    await signUpMutation({ login, name, password, role: 'Student' });
  };

  return (
    <main className='flex justify-center items-center flex-grow-[1]'>
      <form className='m-8' onSubmit={handleSubmit(handleSubmitQuery)}>
        {Object.entries(signUpFields).map(([name, field]) => (
          <Input {...field} {...register(name)} key={field.id} error={formState.errors[name]?.message} />
        ))}

        {isError && <p className='text-[red]'>{String(error)}</p>}
        <Button type='submit' isLoading={isLoading}>
          Sign&nbsp;up
        </Button>
      </form>
    </main>
  );
};
