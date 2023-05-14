import { CreateAnswerDto, CreateQuestionDto } from '@/types';

type GeneratedId = string;
type CreatedId = number;

export type AnswerFormValues = {
  id?: GeneratedId | CreatedId;
  text: CreateAnswerDto['text'];
  isRight: CreateAnswerDto['isRight'];
};

export type QuestionFormValues = {
  id?: GeneratedId | CreatedId;
  text: CreateQuestionDto['text'];
  type: CreateQuestionDto['type'];
  answers: AnswerFormValues[];
};

export type TestFormValues = {
  name: string;
  startTime: Date;
  endTime: Date;
  duration?: string;
  isRandomAnswers: boolean;
  hidden: boolean;
  subjectId?: number;
  questions: QuestionFormValues[];
};
