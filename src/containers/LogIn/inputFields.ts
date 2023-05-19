import { InputProps } from '@/components/shared';

type LogInFieldsNames = 'login' | 'password';

export type LogInFormData = Record<LogInFieldsNames, string>;

export const initLogInFormData: LogInFormData = {
  login: '',
  password: '',
};

export const signUpFields = {
  login: {
    labelText: 'Email адрес',
    id: 'login',
    type: 'email',
    autoComplete: 'on',
    placeholder: 'Email address',
    autoFocus: true,
  },
  password: {
    labelText: 'Пароль',
    id: 'password',
    type: 'password',
    autoComplete: 'on',
    placeholder: 'Пароль',
  },
} as const satisfies Record<LogInFieldsNames, InputProps>;
