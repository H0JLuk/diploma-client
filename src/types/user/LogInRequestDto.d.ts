import { User } from '.';

export type LogInRequestDto = {
  login: User['login'];
  password: string;
};
