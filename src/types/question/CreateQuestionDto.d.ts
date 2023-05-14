import { Question } from './Question.d';

export type CreateQuestionDto = {
  text: Question['text'];
  image?: Question['image'];
  type: Question['type'];
  categoryId?: Question['categoryId'];
  answers: CreateAnswerDto[];
};
