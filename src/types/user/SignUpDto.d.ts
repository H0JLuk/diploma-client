import { User } from '.';

export type SignUpDto = {
  name: User['name'];
  login: User['login'];
  password: string;
  role: User['role'];
};
