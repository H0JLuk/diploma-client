import * as yup from 'yup';

import { CreateQuestionDto, Question } from '@/types';

const answersValidationSchema = yup.object().shape({
  text: yup.string().min(1),
  isRight: yup.boolean().required(),
});

const questionsValidationSchema = yup.object().shape({
  text: yup.string().min(1),
  type: yup.string().oneOf(['input', 'multiple', 'single'] as CreateQuestionDto['type'][]),
  answers: yup
    .array()
    .of(answersValidationSchema)
    .min(1)
    .required()
    .test({
      name: 'answers-count',
      test(value, ctx) {
        if ((ctx.parent.type as Question['type']) === 'input' && value.length > 1) {
          return this.createError({ message: 'Answer should be single' });
        }
        if ((ctx.parent.type as Question['type']) === 'single' && value.length === 1) {
          return this.createError({ message: 'Count of answers should be more 1' });
        }
        return true;
      },
    })
    .test({
      name: 'answers-selected-isRight',
      test(value, ctx) {
        const isSelectedRight = value.some(({ isRight }) => isRight);
        if (!isSelectedRight) {
          return this.createError({ message: 'Single answer should be selected as right' });
        }
        return true;
      },
    }),
});

const emptyErrorMessage = 'Should not be empty';

export const validationSchema = yup.object().shape({
  name: yup.string().required().min(3),
  startTime: yup.date().typeError(emptyErrorMessage).required(),
  endTime: yup.date().typeError(emptyErrorMessage).required(),
  duration: yup.number().positive().typeError(emptyErrorMessage).optional().notRequired().nullable(),
  isRandomAnswers: yup.boolean().required(),
  hidden: yup.boolean().required(),
  subjectId: yup.number().required(),
  questions: yup.array().of(questionsValidationSchema).min(1).max(100).required(),
});
