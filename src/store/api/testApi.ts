import { CreateTestDto, Test, UpdateTestDto } from '@/types';

import { commonApi, providesList } from '../config/commonApi';
import { transformErrorResponse } from './baseQuery';

const testTag = 'test';

export const testApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getTests: builder.query<Test[], number | null>({
      query: subjectId => ({
        url: subjectId ? `tests/subject/${subjectId}` : 'tests',
        credentials: 'include',
      }),
      providesTags: result => providesList(result, testTag),
    }),
    getTest: builder.query<Test, number>({
      query: testId => ({
        url: `tests/${testId}`,
        credentials: 'include',
      }),
      providesTags: result => providesList(result, testTag),
    }),
    createTest: builder.mutation<Test, CreateTestDto>({
      query: body => ({
        url: 'tests',
        method: 'POST',
        body,
        credentials: 'include',
      }),
      transformErrorResponse,
      invalidatesTags: (_, err) => (err ? [] : [testTag]),
    }),
    updateTest: builder.mutation<Test, UpdateTestDto>({
      query: ({ id, ...dto }) => ({
        url: `tests/${id}`,
        method: 'PUT',
        body: dto,
        credentials: 'include',
      }),
      transformErrorResponse,
      invalidatesTags: (_, err, arg) => (err ? [] : [{ type: testTag, id: arg.id }]),
    }),
    deleteTest: builder.mutation<void, number>({
      query: testId => ({
        url: `tests/${testId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      transformErrorResponse,
      invalidatesTags: (_, err, arg) => (err ? [] : [{ type: testTag, id: arg }]),
    }),
  }),
});

export const {
  useGetTestsQuery,
  useGetTestQuery,
  useCreateTestMutation,
  useUpdateTestMutation,
  useDeleteTestMutation,
} = testApi;
