import { CreateQuestionDto } from '../question';
import { Test } from './Test.d';

export type CreateTestDto = {
  name: Test['name'];
  startTime: string;
  endTime: string;
  duration?: number;
  isRandomAnswers?: boolean;
  hidden?: boolean;
  subjectId: number;
  questions: CreateQuestionDto[];
};
