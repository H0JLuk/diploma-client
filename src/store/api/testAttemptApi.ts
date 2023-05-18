import { Test, User } from '@/types';
import { AttemptResult, SendAttemptDto, TestAttempt } from '@/types/testAttempt';

import { commonApi, providesList } from '../config/commonApi';
import { transformErrorResponse } from './baseQuery';

const testAttemptTag = 'test-attempt';

export const testAttemptsApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getTestAttemptResult: builder.query<AttemptResult, number>({
      query: attemptId => ({
        url: `test-history/result/${attemptId}`,
        credentials: 'include',
      }),
      transformErrorResponse,
      providesTags: (result, err) =>
        err
          ? []
          : [
              { type: 'test', id: result!.test.id },
              { type: testAttemptTag, id: result!.testHistory.id },
            ],
    }),
    startTestAttempt: builder.mutation<{ test: Test; testHistory: TestAttempt }, number>({
      query: testId => ({
        url: 'test-history/start',
        credentials: 'include',
        body: { testId },
        method: 'POST',
      }),
      transformErrorResponse,
      invalidatesTags: (_, err) => (err ? [] : [testAttemptTag]),
    }),
    getTestAttempt: builder.query<{ test: Test; testHistory: TestAttempt }, number>({
      query: testAttemptId => ({
        url: `test-history/${testAttemptId}`,
        credentials: 'include',
      }),
      transformErrorResponse,
      providesTags: (result, err) =>
        err
          ? []
          : [
              { type: 'test', id: result!.test.id },
              { type: testAttemptTag, id: result!.testHistory.id },
            ],
    }),
    getTestAttempts: builder.query<{ test: Test; testHistory: TestAttempt }[], void>({
      query: () => ({
        url: 'test-history',
        credentials: 'include',
      }),
      transformErrorResponse,
      providesTags: (result, err) =>
        err || !result
          ? []
          : [
              ...providesList(
                result.map(r => r.test),
                'test',
              ),
              ...providesList(
                result.map(r => r.testHistory),
                testAttemptTag,
              ),
            ],
    }),
    getTestAttemptsByStudentId: builder.query<{ test: Test; testHistory: TestAttempt }[], User['id']>({
      query: studentId => ({
        url: `test-history/users/${studentId}`,
        credentials: 'include',
      }),
      transformErrorResponse,
      providesTags: (result, err) =>
        err || !result
          ? []
          : [
              ...providesList(
                result.map(r => r.test),
                'test',
              ),
              ...providesList(
                result.map(r => r.testHistory),
                testAttemptTag,
              ),
            ],
    }),
    finishTestAttempt: builder.mutation<void, { attemptId: number } & SendAttemptDto>({
      query: ({ attemptId, ...body }) => ({
        url: `test-history/finish/${attemptId}`,
        method: 'POST',
        body,
        credentials: 'include',
      }),
      transformErrorResponse,
      invalidatesTags: (_, err, arg) => (err ? [] : [{ type: testAttemptTag, id: arg.attemptId }]),
    }),

    getUserTestsStats: builder.query<any, number>({
      query: userId => ({
        url: `test-history/stats/users/${userId}`,
        credentials: 'include',
      }),
      transformErrorResponse,
      providesTags: (_, err) => (err ? [] : [testAttemptTag]),
    }),
  }),
});

export const {
  useGetTestAttemptQuery,
  useGetTestAttemptsQuery,
  useGetTestAttemptsByStudentIdQuery,
  useStartTestAttemptMutation,
  useGetTestAttemptResultQuery,
  useFinishTestAttemptMutation,
} = testAttemptsApi;
