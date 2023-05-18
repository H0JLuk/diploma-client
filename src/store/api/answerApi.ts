import { Answer, CreateAnswerDto, UpdateAnswerDto } from '@/types';

import { commonApi } from '../config/commonApi';
import { transformErrorResponse } from './baseQuery';

const answerTag = 'answer';

export const answerApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    createAnswer: builder.mutation<Answer, CreateAnswerDto>({
      query: body => ({
        url: 'answers',
        method: 'POST',
        body,
        credentials: 'include',
      }),
      transformErrorResponse,
      invalidatesTags: (_, err) => (err ? [] : [answerTag]),
    }),
    updateAnswer: builder.mutation<Answer, UpdateAnswerDto>({
      query: ({ id, ...dto }) => ({
        url: `answers/${id}`,
        method: 'PUT',
        body: dto,
        credentials: 'include',
      }),
      transformErrorResponse,
      invalidatesTags: (_, err, arg) => (err ? [] : [{ type: answerTag, id: arg.id }]),
    }),
    deleteAnswer: builder.mutation<void, number>({
      query: id => ({
        url: `answers/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      transformErrorResponse,
      invalidatesTags: (_, err, arg) => (err ? [] : [{ type: answerTag, id: arg }]),
    }),
  }),
});

export const { useCreateAnswerMutation, useUpdateAnswerMutation, useDeleteAnswerMutation } = answerApi;
