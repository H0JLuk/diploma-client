import { Answer } from '../answer';
import { AttemptAnswer } from '../attempt-answer';

export type Question = {
  id: number;
  text: string;
  image: string;
  type: keyof typeof QuestionTypeEnum;
  category?: QuestionCategory;
  categoryId: number;
  answers?: Answer[];
  testHistoryAnswer?: AttemptAnswer[];
};

export enum QuestionTypeEnum {
  single = 'single',
  multiple = 'multiple',
  input = 'input',
}
