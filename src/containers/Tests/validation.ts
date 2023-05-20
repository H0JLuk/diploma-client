import * as yup from 'yup';

import { validationErrors } from '@/constants/validationErrors';

export const validationSchema = yup.object().shape({
  name: yup.string().required(validationErrors.required).min(3, validationErrors.minLength(3)),
});
