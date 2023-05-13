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
      <h3 className='text-2xl mt-2 mb-5 text-center'>List of users</h3>

      <Button className='self-end' onClick={handleOpenCreatingUserModal}>
        Create new user
      </Button>

      {usersList}

      <Modal
        titleText='Create new user'
        acceptBtnText='Create user'
        declineBtnText='Close'
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
              key={field.id}
              error={formValues.formState.errors[name]?.message}
            />
          ))}

          <fieldset>
            <Controller
              name='role'
              control={formValues.control}
              render={({ field }) => (
                <Select
                  isSearchable={false}
                  options={selectOptions}
                  value={{ label: field.value as string, value: field.value as string }}
                  onChange={option => field.onChange(option!.value)}
                  ref={field.ref}
                  placeholder='Select user role'
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
