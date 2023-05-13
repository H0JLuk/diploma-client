import { Question } from './Question';

export type CreateQuestionDto = {
  text: Question['text'];
  image?: Question['image'];
  type: Question['type'];
  categoryId: Question['categoryId'];
  answers: CreateAnswerDto[];
};
