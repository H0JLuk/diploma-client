import { TestFormValues } from '@/components/Tests';
import { CreateTestDto, Test, UpdateTestDto } from '@/types';

export const isEditTestDto = (data: CreateTestDto | UpdateTestDto): data is UpdateTestDto => 'id' in data;

export const fromTestToTestFormFields = (test?: Test): TestFormValues | undefined => {
  if (!test) return;

  const {
    id,
    name,
    hidden,
    isRandomAnswers,
    subjectId,
    duration,
    questions,
    startTime,
    endTime,
    scoreFor3,
    scoreFor4,
    scoreFor5,
  } = test;

  return {
    id,
    name,
    hidden,
    isRandomAnswers,
    scoreFor3,
    scoreFor4,
    scoreFor5,
    subjectId,
    duration: duration || 100_000_000,
    questions: questions!.map(question => ({ ...question, answers: question.answers! })),
    startTime: new Date(startTime),
    endTime: new Date(endTime),
  };
};
