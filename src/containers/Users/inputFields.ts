import { InputProps } from '@/components/shared';
import { User, UserRoles } from '@/types';

type CreatingUserFieldsNames = 'login' | 'name' | 'password' | 'role';

export type CreatingUserFormData = Record<CreatingUserFieldsNames, string> & { role: UserRoles };

export const creatingUserFields = {
  name: {
    labelText: 'Name',
    id: 'name',
    placeholder: 'Name',
  },
  login: {
    labelText: 'login',
    id: 'login',
    type: 'email',
    placeholder: 'Email',
  },
  password: {
    labelText: 'Password',
    id: 'password',
    type: 'password',
    placeholder: 'Password',
  },
} as const satisfies Record<Exclude<CreatingUserFieldsNames, 'role'>, InputProps>;

export const initCreatingUserFormData: CreatingUserFormData = {
  login: '',
  name: '',
  password: '',
  role: 'Methodist',
};

export const selectOptions = [
  { label: 'Student', value: 'Student' },
  { label: 'Methodist', value: 'Methodist' },
] as { label: string; value: User['role'] }[];
