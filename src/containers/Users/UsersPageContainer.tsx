import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

import { Button, Input, Modal } from '@/components/shared';
import { UserList } from '@/components/Users';
import { useMethods } from '@/hooks/useMethods';
import {
  useBanUserMutation,
  useChangeUserRoleMutation,
  useCreateUserMutation,
  useGetUsersQuery,
} from '@/store/api/userApi';

import { creatingUserFields, CreatingUserFormData, initCreatingUserFormData, selectOptions } from './inputFields';
import { validationSchema } from './validation';

const createUserFormId = 'create-user-form';

export const UsersPageContainer: FC = () => {
  const formValues = useForm<CreatingUserFormData>({
    defaultValues: initCreatingUserFormData,
    resolver: yupResolver(validationSchema),
  });

  const [modalState, { handleOpenCreatingUserModal, handleCloseCreatingUserModal }] = useMethods({
    initialState: { isOpened: false },
    methods: {
      handleOpenCreatingUserModal: () => ({ isOpened: true }),
      handleCloseCreatingUserModal: () => {
        formValues.reset();
        formValues.setValue('role', 'Student');
        return { isOpened: false };
      },
    },
  });

  const { currentData: usersData, isError: isGetUsersError, isFetching: isGetUsersFetching } = useGetUsersQuery();

  const [createUserMutation, { isLoading: isCreateUserLoading, error: creatingUserError }] = useCreateUserMutation();
  const [banUserMutation, { isLoading: isBanUserLoading }] = useBanUserMutation();
  const [changeUserRoleMutation, { isLoading: isChangeUserRoleLoading }] = useChangeUserRoleMutation();

  const isFetching = isBanUserLoading || isGetUsersFetching || isChangeUserRoleLoading;

  const handleSubmit: Parameters<typeof formValues.handleSubmit>[0] = async data => {
    try {
      await createUserMutation(data).unwrap();
      handleCloseCreatingUserModal();
    } catch {
      /* empty */
    }
  };

  const usersList = useMemo(
    () => (
      <UserList
        users={usersData}
        isFetching={isFetching}
        isError={isGetUsersError}
        onChangeUserRole={changeUserRoleMutation}
        onBanUser={banUserMutation}
      />
    ),
    [usersData, isFetching, isGetUsersError, changeUserRoleMutation, banUserMutation],
  );

  return (
    <main className='flex flex-col items-center flex-grow-[1]'>
      <h3 className='text-2xl mt-2 mb-5 text-center'>Список пользователей</h3>

      <Button className='self-end' onClick={handleOpenCreatingUserModal}>
        Создать нового пользователя
      </Button>

      {usersList}

      <Modal
        titleText='Создание нового пользователя'
        acceptBtnText='Создать пользователя'
        declineBtnText='Закрыть'
        isOpened={modalState.isOpened}
        formId={createUserFormId}
        onClose={handleCloseCreatingUserModal}
        isLoading={isCreateUserLoading}
      >
        <form id={createUserFormId} onSubmit={formValues.handleSubmit(handleSubmit)}>
          {Object.entries(creatingUserFields).map(([name, field]) => (
            <Input
              {...field}
              {...formValues.register(name)}
              customClass='w-full'
              key={field.id}
              error={formValues.formState.errors[name]?.message}
            />
          ))}

          <fieldset>
            <label className='mb-0.5' htmlFor='role-select'>
              Роль
            </label>
            <Controller
              name='role'
              control={formValues.control}
              render={({ field }) => (
                <Select
                  isSearchable={false}
                  inputId='role-select'
                  options={selectOptions}
                  onChange={option => field.onChange(option!.value)}
                  ref={field.ref}
                  placeholder='Выберите роль пользователя'
                />
              )}
              rules={{ required: true }}
            />
            <p className='text-[red]'>{formValues.formState.errors.role?.message}</p>
          </fieldset>

          {creatingUserError && <p className='text-[red] mt-4'>{String(creatingUserError)}</p>}
        </form>
      </Modal>
    </main>
  );
};
