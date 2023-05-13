import { CreateSubjectDto, Subject, UpdateSubjectDto } from '@/types';

import { commonApi, providesList } from '../config/commonApi';
import { transformErrorResponse } from './baseQuery';

export const subjectApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getSubjects: builder.query<Subject[], void>({
      query: () => ({
        url: 'subjects',
        credentials: 'include',
      }),
      providesTags: result => providesList(result, 'subject'),
    }),
    getSubject: builder.query<Subject, number>({
      query: id => ({
        url: `subjects/${id}`,
        credentials: 'include',
      }),
      providesTags: (result, error, id) => providesList([{ id }], 'subject'),
    }),
    createSubject: builder.mutation<Subject, CreateSubjectDto>({
      query: body => ({
        url: 'subjects',
        method: 'POST',
        body,
        credentials: 'include',
      }),
      transformErrorResponse,
      invalidatesTags: (_, err) => (err ? [] : [{ type: 'subject', id: 'LIST' }]),
    }),
    updateSubject: builder.mutation<Subject, UpdateSubjectDto>({
      query: ({ id, ...dto }) => ({
        url: `subjects/${id}`,
        method: 'PUT',
        body: dto,
        credentials: 'include',
      }),
      transformErrorResponse,
      invalidatesTags: (_, err, arg) => (err ? [] : [{ type: 'subject', id: arg.id }]),
    }),
    deleteSubject: builder.mutation<Subject, number>({
      query: subjectId => ({
        url: `subjects/${subjectId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      transformErrorResponse,
      invalidatesTags: (_, err, arg) => (err ? [] : [{ type: 'subject', id: arg }]),
    }),
  }),
});

export const {
  useGetSubjectsQuery,
  useGetSubjectQuery,
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
} = subjectApi;
