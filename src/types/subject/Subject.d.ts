import { Test } from '../test';

export type Subject = {
  id: number;
  name: string;
  tests?: Test[];
  testsLength?: number;
};
