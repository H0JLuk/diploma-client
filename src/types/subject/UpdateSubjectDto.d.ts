import { Subject } from './Subject';

export type UpdateSubjectDto = {
  id: Subject['id'];
  name: Subject['name'];
};
