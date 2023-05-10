import { InputProps } from '@/components/shared';

type LogInFieldsNames = 'login' | 'password';

export type LogInFormData = Record<LogInFieldsNames, string>;

export const initLogInFormData: LogInFormData = {
  login: '',
  password: '',
};

export const signUpFields = {
  login: {
    labelText: 'Email address',
    id: 'login',
    type: 'email',
    autoComplete: 'on',
    placeholder: 'Email address',
    autoFocus: true,
  },
  password: {
    labelText: 'Password',
    id: 'password',
    type: 'password',
    autoComplete: 'on',
    placeholder: 'Password',
  },
} as const satisfies Record<LogInFieldsNames, InputProps>;
