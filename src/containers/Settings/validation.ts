import Joi from 'joi';

export const validationSchema = Joi.object({
  name: Joi.string().min(4).max(40).required(),
  oldPassword: Joi.string()
    .optional()
    .pattern(/^[^\s]{4,30}$/)
    .allow('')
    .messages({
      'string.min': '"old password" should have a minimum length of {$limit}',
      'string.pattern.base': '"old password" should contain a min 4 non spacing chars',
    }),
  newPassword: Joi.when('oldPassword', {
    is: ([value]: [string]) => !!value.length,
    then: Joi.string()
      .required()

      .pattern(/^[^\s]{4,30}$/)
      .messages({
        'string.required': '"old password" should not be empty for password change',
        'string.min': '"old password" should have a minimum length of {$limit}',
        'string.pattern.base': '"old password" should contain a min 4 non spacing chars',
      }),
    otherwise: Joi.valid('').messages({ 'string.valid': '"old password" should be filled' }),
  }),
});
