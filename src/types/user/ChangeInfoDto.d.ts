import { User } from './User';

export type ChangeInfoDto = {
  name: User['name'];
  password?: string;
};
