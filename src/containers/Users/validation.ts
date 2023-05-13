import * as yup from 'yup';

import { UserRoles as userRoles } from '@/types';

const userRoles: userRoles[] = ['Admin', 'Methodist', 'Student'];

export const validationSchema = yup.object().shape({
  name: yup.string().required().min(4),
  login: yup.string().required().email(),
  password: yup.string().required().min(4),
  role: yup.string().oneOf(userRoles),
});
