import { Answer } from './Answer.d';

export type UpdateAnswerDto = {
  id: Answer['id'];
  text?: Answer['text'];
  image?: Answer['image'];
  isRight?: Answer['isRight'];
};
