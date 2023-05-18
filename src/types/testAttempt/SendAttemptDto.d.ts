import { Question } from '../question';

export type SendAttemptDto = Record<Question['id'], { answer: string } | { answerId: number }>;
