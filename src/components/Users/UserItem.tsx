import { useRouter } from 'next/navigation';
import { FC } from 'react';
import Select from 'react-select';

import { Routes } from '@/components/Navbar/navRoutes';
import { Button } from '@/components/shared';
import { ChangeUserRoleDto, User, UserRolesEnum } from '@/types';

type UserItemProps = {
  user: User;
  isFetching: boolean;
  onBanUser: (userId: number) => void;
  onChangeRole: (dto: ChangeUserRoleDto) => void;
};

const cardColorByIndex = {
  0: '#FFFBEC',
  1: '#F9ECFF',
  2: '#ECEEFF',
};

const roleOptions = [
  { label: 'Methodist', value: UserRolesEnum.Methodist },
  { label: 'Student', value: UserRolesEnum.Student },
];

export const UserItem: FC<UserItemProps> = ({ user, isFetching, onBanUser, onChangeRole }) => {
  const router = useRouter();

  return (
    <div className='pr-5 pb-5 xs:max-w-[400px] w-full'>
      <div
        className={`bg-[${cardColorByIndex[(user.id % 3) as keyof typeof cardColorByIndex]}] rounded-xl`}
        key={user.id}
      >
        <div className='flex flex-col relative p-8 rounded-xl bg-white shadow-xl translate-x-4 translate-y-4 '>
          {user.role !== 'Admin' && (
            <Button
              variant='clear'
              disabled={isFetching}
              onClick={() => onBanUser(user.id)}
              className='absolute top-3 right-3'
            >
              &#x2715;
            </Button>
          )}

          <div className='my-3 font-semibold text-lg'>Name: {user.name}</div>
          {user.role === 'Admin' && <div className='text-sm font-light mb-4'>role: Admin</div>}
          {user.role !== 'Admin' && (
            <Select
              value={roleOptions.find(role => role!.value === user.role)}
              options={roleOptions}
              isSearchable={false}
              onChange={option => onChangeRole({ id: user.id, role: option!.value })}
              className='relative z-[100]'
            />
          )}

          {user.role === 'Student' && (
            <Button
              onClick={() => router.push(`${Routes.ATTEMPTS}/users/${user.id}`)}
              className='mt-4 self-start inline-block'
            >
              Открыть статистику тестирований
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
