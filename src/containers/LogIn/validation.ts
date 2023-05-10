import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  login: yup.string().required().email(),
  password: yup.string().required().min(4),
});
