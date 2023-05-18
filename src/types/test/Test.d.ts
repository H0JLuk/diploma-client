import { Question, Subject } from '..';

export type Test = {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  duration?: number;
  isRandomAnswers: boolean;
  scoreFor3: number;
  scoreFor4: number;
  scoreFor5: number;
  hidden: boolean;
  subject?: Subject;
  subjectId: number;
  questions?: Question[];
};
