import { Subject } from '..';

export type Test = {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  duration?: number;
  isRandomAnswers: boolean;
  hidden: boolean;
  subject?: Subject;
  subjectId: number;
  questions?: Question;
};
