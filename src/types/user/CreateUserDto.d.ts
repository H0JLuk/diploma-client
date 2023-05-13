import { User } from '.';

export type CreateUserDto = {
  name: User['name'];
  login: User['login'];
  password: string;
  role: User['role'];
};
