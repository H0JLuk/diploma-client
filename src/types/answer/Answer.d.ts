import { Question } from '../question';

export type Answer = {
  id: number;
  text?: string;
  image?: string;
  isRight?: boolean;
  questionId: number;
  question?: Question;
};
