import Joi from 'joi';

export const validationSchema = Joi.object({
  name: Joi.string().min(4).max(40).required(),
  oldPassword: Joi.string()
    .optional()
    .pattern(/^[^\s]{4,30}$/)
    .allow('')
    .messages({
      'string.min': '"Старый пароль" должен быть не короче {$limit} символов',
      'string.pattern.base': 'Старый пароль не должен быть короче 4 символов',
    }),
  newPassword: Joi.when('oldPassword', {
    is: ([value]: [string]) => !!value.length,
    then: Joi.string()
      .required()

      .pattern(/^[^\s]{4,30}$/)
      .messages({
        'string.required': '"Старый пароль" не должен быть пустым для смены пароля',
        'string.min': '"Старый пароль" должен иметь минимальную длину {$limit} символов',
        'string.pattern.base': 'Новый пароль не должен быть короче 4 символов',
      }),
    otherwise: Joi.valid('').messages({ 'string.valid': '"Старый пароль" должен быть заполнен' }),
  }),
});
