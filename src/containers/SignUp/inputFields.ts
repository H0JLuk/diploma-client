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
    labelText: 'Name',
    id: 'name',
    autoComplete: 'on',
    placeholder: 'Name',
    autoFocus: true,
  },
  login: {
    labelText: 'Email address',
    id: 'login',
    type: 'email',
    autoComplete: 'on',
    placeholder: 'Email address',
  },
  password: {
    labelText: 'Password',
    id: 'password',
    type: 'password',
    autoComplete: 'on',
    placeholder: 'Password',
  },
  confirmPassword: {
    labelText: 'Confirm Password',
    id: 'confirmPassword',
    type: 'password',
    autoComplete: 'on',
    placeholder: 'Repeat password',
  },
} as const satisfies Record<SignUpFieldsNames, InputProps>;
