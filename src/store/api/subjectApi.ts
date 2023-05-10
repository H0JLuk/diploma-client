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
    createSubject: builder.mutation<Subject, CreateSubjectDto>({
      query: body => ({
        url: 'subjects',
        method: 'POST',
        body,
        credentials: 'include',
      }),
      transformErrorResponse,
      invalidatesTags: result => (result ? ['subject'] : []),
    }),
    updateSubject: builder.mutation<Subject, UpdateSubjectDto>({
      query: ({ id, ...dto }) => ({
        url: `subjects/${id}`,
        method: 'PUT',
        body: dto,
        credentials: 'include',
      }),
      transformErrorResponse,
      invalidatesTags: (result, error, arg) => (result ? [{ type: 'subject', id: arg.id }] : []),
    }),
    deleteSubject: builder.mutation<Subject, number>({
      query: subjectId => ({
        url: `subjects/${subjectId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      transformErrorResponse,
      invalidatesTags: (result, error, arg) => (result ? [{ type: 'subject', id: arg }] : []),
    }),
  }),
});

export const { useGetSubjectsQuery, useCreateSubjectMutation, useUpdateSubjectMutation, useDeleteSubjectMutation } =
  subjectApi;
