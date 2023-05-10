import { LogInRequestDto, SignUpRequestDto, User } from '@/types';

import { commonApi } from '../config/commonApi';
import { transformErrorResponse } from './baseQuery';

const currentUserTag = 'current-user';

export const authApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    checkAuth: builder.query<User, void>({
      query: () => ({
        url: 'auth/current-user',
        credentials: 'include',
      }),
      providesTags: [currentUserTag],
    }),
    logIn: builder.mutation<void, LogInRequestDto>({
      query: body => ({
        url: 'auth/login',
        method: 'POST',
        body,
        credentials: 'include',
      }),
      transformErrorResponse,
      invalidatesTags: result => (result ? [currentUserTag] : []),
    }),
    signUp: builder.mutation<void, SignUpRequestDto>({
      query: body => ({
        url: 'auth/registration',
        method: 'POST',
        body,
        credentials: 'include',
      }),
      transformErrorResponse,
      invalidatesTags: result => (result ? [currentUserTag] : []),
    }),
    signOut: builder.mutation<void, void>({
      query: () => ({
        url: 'auth/sign-out',
        method: 'POST',
        credentials: 'include',
      }),
      onQueryStarted(arg, api) {
        api.queryFulfilled.then(() => {
          api.dispatch(authApi.util.invalidateTags([currentUserTag]));
        });
      },
    }),
  }),
});

export const { useCheckAuthQuery, useLazyCheckAuthQuery, useLogInMutation, useSignUpMutation, useSignOutMutation } =
  authApi;
