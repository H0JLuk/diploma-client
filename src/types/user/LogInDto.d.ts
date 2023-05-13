import { User } from '.';

export type LogInDto = {
  login: User['login'];
  password: string;
};
