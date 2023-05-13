import { Subject } from '..';

export type Test = {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  duration?: number;
  isRandomAnswers?: boolean;
  subject?: Subject;
  subjectId: number;
  questions: Question;
};
