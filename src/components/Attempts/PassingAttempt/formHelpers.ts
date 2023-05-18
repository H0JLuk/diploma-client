import { Question } from '@/types';

type FormAnswerObj = { answerId: number | null } | { answer: string };
export type AttemptFormState = Record<string, FormAnswerObj>;

export const fromTestToFormState = (questions: Question[]): AttemptFormState =>
  questions.reduce((acc, question) => {
    if (question.type === 'input') {
      acc[question.id] = { answer: '' };
    } else {
      acc[question.id] = { answerId: null };
    }
    return acc;
  }, {} as Record<string, FormAnswerObj>);
