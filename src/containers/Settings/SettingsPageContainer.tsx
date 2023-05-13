import { joiResolver } from '@hookform/resolvers/joi';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input } from '@/components/shared';
import { useChangeInfoMutation, useCheckAuthQuery } from '@/store/api/authApi';

import { settingsFields, type SettingsFormData } from './inputFields';
import { validationSchema } from './validation';

export const SettingsPageContainer: FC = () => {
  const { currentData: userInfo } = useCheckAuthQuery();

  const { register, handleSubmit, formState } = useForm<SettingsFormData>({
    defaultValues: {
      name: userInfo?.name || '',
      oldPassword: '',
      newPassword: '',
    },
    resolver: joiResolver(validationSchema),
  });

  const [changeInfoMutation, { error, isLoading, isError }] = useChangeInfoMutation();

  const handleSubmitQuery: Parameters<typeof handleSubmit>[0] = async (data, e) => {
    const { name, oldPassword, newPassword } = data;
    const formData = {
      name,
      ...(oldPassword && { oldPassword, newPassword }),
    };
    changeInfoMutation(formData);
  };

  return (
    <div className='flex justify-center items-center flex-col'>
      <h3 className='text-2xl mt-2 mb-5 text-center'>User settings</h3>

      <form className='m-8' onSubmit={handleSubmit(handleSubmitQuery)}>
        {Object.entries(settingsFields).map(([name, field]) => (
          <Input {...field} {...register(name)} key={field.id} error={formState.errors[name]?.message} />
        ))}

        {isError && <p className='text-[red]'>{String(error)}</p>}
        <Button type='submit' isLoading={isLoading}>
          Change&nbsp;info
        </Button>
      </form>
    </div>
  );
};
