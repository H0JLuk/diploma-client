import { Answer } from './Answer.d';

export type CreateAnswerDto = {
  text?: Answer['text'];
  image?: Answer['image'];
  isRight?: Answer['isRight'];
  questionId: Answer['questionId'];
};
