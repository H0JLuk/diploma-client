import { InputProps } from '@/components/shared';

type SettingsFieldsNames = 'name' | 'oldPassword' | 'newPassword';

export type SettingsFormData = Record<SettingsFieldsNames, string>;

export const settingsFields = {
  name: {
    labelText: 'Имя',
    id: 'name',
    placeholder: 'Имя',
    autoFocus: true,
  },
  oldPassword: {
    labelText: 'Старый пароль',
    id: 'oldPassword',
    type: 'password',
    placeholder: 'Старый пароль',
  },
  newPassword: {
    labelText: 'Новый пароль',
    id: 'newPassword',
    type: 'password',
    placeholder: 'Новый пароль',
  },
} as const satisfies Record<SettingsFieldsNames, InputProps>;
