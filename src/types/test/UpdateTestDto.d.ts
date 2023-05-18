import { Test } from './Test.d';

export type UpdateTestDto = {
  id: Test['id'];
  name?: Test['name'];
  startTime?: Test['startTime'];
  endTime?: Test['endTime'];
  duration?: Test['duration'];
  scoreFor3?: Test['scoreFor3'];
  scoreFor4?: Test['scoreFor4'];
  scoreFor5?: Test['scoreFor5'];
  isRandomAnswers?: Test['isRandomAnswers'];
  hidden?: Test['hidden'];
};
