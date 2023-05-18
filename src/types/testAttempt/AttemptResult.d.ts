import { Test } from '../test/Test';
import { TestAttempt } from './TestAttempt';

export type AttemptResult = {
  mark: number;
  totalRightPoints: number;
  test: Test;
  testHistory: TestAttempt;
};
