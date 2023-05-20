import * as yup from 'yup';

import { validationErrors } from '@/constants/validationErrors';

export const validationSchema = yup.object().shape({
  login: yup.string().required(validationErrors.required).email(validationErrors.email),
  password: yup.string().required(validationErrors.required).min(4, validationErrors.minLength(4)),
});
