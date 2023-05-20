export const validationErrors = {
  required: 'Обязательное поле',
  email: 'Неправильный email адрес',
  minLength: (length: number) => `Минимальная длина - ${length}`,
  maxLength: (length: number) => `Максимальная длина - ${length}`,
  positive: 'Число должно быть позитивным',
};
