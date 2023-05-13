import { ChangeUserRoleDto, CreateUserDto, User } from '@/types';

import { commonApi, providesList } from '../config/commonApi';
import { transformErrorResponse } from './baseQuery';

const userApiTag = 'user';

export const testApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: 'users',
        credentials: 'include',
      }),
      providesTags: result => providesList(result, userApiTag),
    }),
    getStudents: builder.query<User[], void>({
      query: () => ({
        url: 'users/students',
        credentials: 'include',
      }),
      providesTags: result => providesList(result, userApiTag),
    }),
    createUser: builder.mutation<void, CreateUserDto>({
      query: body => ({
        url: 'users',
        method: 'POST',
        body,
        credentials: 'include',
      }),
      transformErrorResponse,
      invalidatesTags: (_, err) => (err ? [] : [userApiTag]),
    }),
    changeUserRole: builder.mutation<void, ChangeUserRoleDto>({
      query: ({ id, role }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: { role },
        credentials: 'include',
      }),
      transformErrorResponse,
      invalidatesTags: (_, err, arg) => (err ? [] : [{ type: userApiTag, id: arg.id }]),
    }),
    banUser: builder.mutation<void, number>({
      query: userId => ({
        url: `users/ban-user/${userId}`,
        method: 'POST',
        credentials: 'include',
      }),
      transformErrorResponse,
      invalidatesTags: (_, err, arg) => (err ? [] : [{ type: userApiTag, id: arg }]),
    }),
    changeStudentRole: builder.mutation<void, ChangeUserRoleDto>({
      query: ({ id, role }) => ({
        url: `/users/students/${id}`,
        method: 'PUT',
        body: { role },
        credentials: 'include',
      }),
      transformErrorResponse,
      invalidatesTags: (_, err, arg) => (err ? [] : [{ type: userApiTag, id: arg.id }]),
    }),
    banStudent: builder.mutation<void, number>({
      query: studentId => ({
        url: `users/students/ban-user/${studentId}`,
        method: 'POST',
        credentials: 'include',
      }),
      transformErrorResponse,
      invalidatesTags: (_, err, arg) => (err ? [] : [{ type: userApiTag, id: arg }]),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetStudentsQuery,
  useChangeUserRoleMutation,
  useCreateUserMutation,
  useBanUserMutation,
  useChangeStudentRoleMutation,
  useBanStudentMutation,
} = testApi;
