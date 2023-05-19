import { FC } from 'react';

import { ChangeUserRoleDto, User } from '@/types';

import { UserItem } from './UserItem';

type UserListProps = {
  users?: User[];
  isFetching: boolean;
  isError: boolean;
  onBanUser: (userId: number) => void;
  onChangeUserRole: (dto: ChangeUserRoleDto) => void;
};

export const UserList: FC<UserListProps> = ({ users, isFetching, isError, onBanUser, onChangeUserRole }) => (
  <>
    {isFetching && <p>Загрузка...</p>}
    {isError && <p>Оой, что-то пошло не так...</p>}
    <div className='flex flex-col flex-wrap gap-4 md:flex-row justify-center justify-items-start items-center mt-2 w-full'>
      {users?.map(user => (
        <UserItem
          user={user}
          key={user.id}
          isFetching={isFetching}
          onBanUser={onBanUser}
          onChangeRole={onChangeUserRole}
        />
      ))}
    </div>
  </>
);
