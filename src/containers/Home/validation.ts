import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup.string().required().min(3),
});
