import * as yup from 'yup';

import { validationErrors } from '@/constants/validationErrors';
import { CreateQuestionDto, Question } from '@/types';

const answersValidationSchema = yup.object().shape({
  text: yup.string().min(1, validationErrors.minLength(1)),
  isRight: yup.boolean().required(validationErrors.required),
});

const questionsValidationSchema = yup.object().shape({
  text: yup.string().min(1, validationErrors.minLength(1)),
  type: yup.string().oneOf(['input', 'multiple', 'single'] as CreateQuestionDto['type'][]),
  answers: yup
    .array()
    .of(answersValidationSchema)
    .min(1, validationErrors.minLength(1))
    .required(validationErrors.required)
    .test({
      name: 'answers-count',
      test(value, ctx) {
        if ((ctx.parent.type as Question['type']) === 'input' && value.length > 1) {
          return this.createError({ message: 'Ответ должен быть 1' });
        }
        if ((ctx.parent.type as Question['type']) === 'single' && value.length === 1) {
          return this.createError({ message: 'Количество ответов должно быть больше 1' });
        }
        return true;
      },
    })
    .test({
      name: 'answers-selected-isRight',
      test(value, ctx) {
        const isSelectedRight = value.some(({ isRight }) => isRight);
        if (!isSelectedRight) {
          return this.createError({ message: 'Один ответ должен быть выбран как правильный' });
        }
        return true;
      },
    }),
});

const emptyErrorMessage = 'Не должно быть пустым';

export const validationSchema = yup.object().shape({
  name: yup.string().required(validationErrors.required).min(3, validationErrors.minLength(3)),
  startTime: yup.date().typeError(emptyErrorMessage).required(validationErrors.required),
  endTime: yup.date().typeError(emptyErrorMessage).required(validationErrors.required),
  duration: yup
    .number()
    .positive(validationErrors.positive)
    .typeError(emptyErrorMessage)
    .optional()
    .notRequired()
    .nullable(),
  scoreFor3: yup.number().positive(validationErrors.positive).typeError(emptyErrorMessage),
  scoreFor4: yup.number().positive(validationErrors.positive).typeError(emptyErrorMessage),
  scoreFor5: yup.number().positive(validationErrors.positive).typeError(emptyErrorMessage),
  isRandomAnswers: yup.boolean().required(validationErrors.required),
  hidden: yup.boolean().required(validationErrors.required),
  subjectId: yup.number().required(validationErrors.required),
  questions: yup
    .array()
    .of(questionsValidationSchema)
    .min(1, validationErrors.minLength(1))
    .max(100, validationErrors.maxLength(100))
    .required(validationErrors.required),
});
