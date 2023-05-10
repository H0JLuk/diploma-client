import { User } from '.';

export type SignUpRequestDto = {
  name: User['name'];
  login: User['login'];
  password: string;
  role: User['role'];
};
