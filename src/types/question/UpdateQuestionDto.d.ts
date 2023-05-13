import { Question } from './Question.d';

export type UpdateQuestionDto = {
  id: Question['id'];
  text?: Question['text'];
  image?: Question['image'];
  type?: Question['type'];
};
