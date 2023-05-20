import { CreateAnswerDto, CreateQuestionDto } from '@/types';

export type AnswerFormValues = {
  id?: number;
  text: CreateAnswerDto['text'];
  isRight: CreateAnswerDto['isRight'];
};

export type QuestionFormValues = {
  id?: number;
  text: CreateQuestionDto['text'];
  type: CreateQuestionDto['type'];
  answers: AnswerFormValues[];
};

export type TestFormValues = {
  id?: number;
  name: string;
  startTime: Date;
  endTime: Date;
  duration?: number;
  scoreFor3?: number;
  scoreFor4?: number;
  scoreFor5?: number;
  isRandomAnswers: boolean;
  hidden: boolean;
  subjectId?: number;
  questions: QuestionFormValues[];
};
