import { InputProps } from '@/components/shared';

type SignUpFieldsNames = 'login' | 'name' | 'password' | 'confirmPassword';

export type SignUpFormData = Record<SignUpFieldsNames, string>;

export const initSignUpFormData: SignUpFormData = {
  name: '',
  login: '',
  password: '',
  confirmPassword: '',
};

export const signUpFields = {
  name: {
    labelText: 'Имя',
    id: 'name',
    autoComplete: 'on',
    placeholder: 'Имя',
    autoFocus: true,
  },
  login: {
    labelText: 'Email адрес',
    id: 'login',
    type: 'email',
    autoComplete: 'on',
    placeholder: 'Email адрес',
  },
  password: {
    labelText: 'Пароль',
    id: 'password',
    type: 'password',
    autoComplete: 'on',
    placeholder: 'Пароль',
  },
  confirmPassword: {
    labelText: 'Повторите пароль',
    id: 'confirmPassword',
    type: 'password',
    autoComplete: 'on',
    placeholder: 'Повторите пароль',
  },
} as const satisfies Record<SignUpFieldsNames, InputProps>;
