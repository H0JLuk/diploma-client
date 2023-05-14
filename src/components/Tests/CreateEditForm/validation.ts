import * as yup from 'yup';

import { CreateQuestionDto } from '@/types';

const answersValidationSchema = yup.object().shape({
  text: yup.string().min(5),
  // isRight: yup.boolean().required(),
});

const questionsValidationSchema = yup.object().shape({
  text: yup.string().min(5),
  type: yup.string().oneOf(['input', 'multiple', 'single'] as CreateQuestionDto['type'][]),
  answers: yup.array().of(answersValidationSchema).min(1).max(7).required(),
});

export const validationSchema = yup.object().shape({
  name: yup.string().required().min(4),
  startTime: yup.date().required(),
  endTime: yup.date().required(),
  duration: yup.number().positive().optional().notRequired().nullable(),
  isRandomAnswers: yup.boolean().required(),
  hidden: yup.boolean().required(),
  subjectId: yup.number().required(),
  questions: yup.array().of(questionsValidationSchema).min(1).max(100).required(),
});
