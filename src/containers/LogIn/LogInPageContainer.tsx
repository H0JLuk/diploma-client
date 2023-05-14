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
    <div className='flex justify-center items-center flex-col flex-grow-[1]'>
      <h3 className='text-2xl mt-2 mb-5 text-center'>Log In form</h3>

      <form className='m-8 max-w-[350px] w-full' onSubmit={handleSubmit(handleSubmitQuery)}>
        {Object.entries(signUpFields).map(([name, field]) => (
          <Input
            {...field}
            {...register(name)}
            customClass='w-full'
            key={field.id}
            error={formState.errors[name]?.message}
          />
        ))}

        {isError && <p className='text-[red]'>{String(error)}</p>}
        <Button type='submit' isLoading={isLoading}>
          Log&nbsp;in
        </Button>
      </form>
    </div>
  );
};
