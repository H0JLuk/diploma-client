import * as yup from 'yup';

const mapRules = <Rule>(map: Record<string, unknown>, rule: Rule) =>
  Object.keys(map).reduce((acc, key) => ({ ...acc, [key]: rule }), {} as Record<string, Rule>);

export const validationSchema = yup.lazy(map =>
  yup.object(
    mapRules(
      map,
      yup
        .object({
          answer: yup.string(),
          answerId: yup.number(),
        })
        .test(
          'text answer or select answer',
          'Answer is required',
          obj => !!((typeof obj.answer === 'string' && obj.answer.length) || obj.answerId),
        ),
    ),
  ),
);
