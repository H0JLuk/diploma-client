import { CreateQuestionDto } from '../question';
import { Test } from './Test.d';

export type CreateTestDto = {
  name: Test['name'];
  startTime: string;
  endTime: string;
  duration?: number;
  isRandomAnswers?: boolean;
  scoreFor3: Test['scoreFor3'];
  scoreFor4: Test['scoreFor4'];
  scoreFor5: Test['scoreFor5'];
  hidden?: boolean;
  subjectId: number;
  questions: CreateQuestionDto[];
};
