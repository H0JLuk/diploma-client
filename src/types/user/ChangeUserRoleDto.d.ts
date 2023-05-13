import { User } from './User';

export type ChangeUserRoleDto = {
  id: User['id'];
  role: User['role'];
};
