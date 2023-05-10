import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup.string().required().min(4),
  login: yup.string().required().email(),
  password: yup.string().required().min(4),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords must match'),
});
