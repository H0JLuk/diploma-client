import { CreateQuestionDto, Question, UpdateQuestionDto } from '@/types';

import { commonApi } from '../config/commonApi';
import { transformErrorResponse } from './baseQuery';

const questionApiTag = 'question';

export const questionApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    createQuestion: builder.mutation<Question, CreateQuestionDto>({
      query: body => ({
        url: 'questions',
        method: 'POST',
        body,
        credentials: 'include',
      }),
      transformErrorResponse,
      invalidatesTags: (_, err) => (err ? [] : [questionApiTag]),
    }),
    updateQuestion: builder.mutation<Question, UpdateQuestionDto>({
      query: ({ id, ...dto }) => ({
        url: `questions/${id}`,
        method: 'PUT',
        body: dto,
        credentials: 'include',
      }),
      transformErrorResponse,
      invalidatesTags: (_, err, arg) => (err ? [] : [{ type: questionApiTag, id: arg.id }]),
    }),
    deleteQuestion: builder.mutation<void, number>({
      query: id => ({
        url: `questions/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      transformErrorResponse,
      invalidatesTags: (_, err, arg) => (err ? [] : [{ type: questionApiTag, id: arg }]),
    }),
  }),
});

export const { useCreateQuestionMutation, useUpdateQuestionMutation, useDeleteQuestionMutation } = questionApi;
