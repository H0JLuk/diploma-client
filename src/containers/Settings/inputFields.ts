import { InputProps } from '@/components/shared';

type SettingsFieldsNames = 'name' | 'oldPassword' | 'newPassword';

export type SettingsFormData = Record<SettingsFieldsNames, string>;

export const settingsFields = {
  name: {
    labelText: 'Name',
    id: 'login',
    placeholder: 'Name',
    autoFocus: true,
  },
  oldPassword: {
    labelText: 'Old password',
    id: 'oldPassword',
    type: 'password',
    placeholder: 'Old password',
  },
  newPassword: {
    labelText: 'New password',
    id: 'newPassword',
    type: 'password',
    placeholder: 'New password',
  },
} as const satisfies Record<SettingsFieldsNames, InputProps>;
