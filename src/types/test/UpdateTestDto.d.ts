import { Test } from './Test.d';

export type UpdateTestDto = {
  id: Test['id'];
  name?: Test['name'];
  startTime?: Test['startTime'];
  endTime?: Test['endTime'];
  duration?: Test['duration'];
  isRandomAnswers?: Test['isRandomAnswers'];
  hidden?: Test['hidden'];
};
