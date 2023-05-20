import * as yup from 'yup';

import { validationErrors } from '@/constants/validationErrors';
import { UserRoles as userRoles } from '@/types';

const userRoles: userRoles[] = ['Admin', 'Methodist', 'Student'];

export const validationSchema = yup.object().shape({
  name: yup.string().required(validationErrors.required).min(4, validationErrors.minLength(4)),
  login: yup.string().required(validationErrors.required).email(validationErrors.email),
  password: yup.string().required(validationErrors.required).min(4, validationErrors.minLength(4)),
  role: yup.string().oneOf(userRoles, 'Выберите корректную роль').required('Выберите роль'),
});
