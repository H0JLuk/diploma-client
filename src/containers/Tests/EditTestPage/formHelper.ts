import { TestFormValues } from '@/components/Tests';
import { CreateTestDto, Test, UpdateTestDto } from '@/types';

export const isEditTestDto = (data: CreateTestDto | UpdateTestDto): data is UpdateTestDto => 'id' in data;

export const fromTestToTestFormFields = (test?: Test): TestFormValues | undefined => {
  if (!test) return;

  const { id, name, hidden, isRandomAnswers, subjectId, duration, questions, startTime, endTime } = test;
  return {
    id,
    name,
    hidden,
    isRandomAnswers,
    subjectId,
    duration,
    questions,
    startTime: new Date(startTime),
    endTime: new Date(endTime),
  };
};
