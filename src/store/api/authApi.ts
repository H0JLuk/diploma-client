import { ChangeInfoDto, LogInDto, SignUpDto, User } from '@/types';

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
    changeInfo: builder.mutation<void, ChangeInfoDto>({
      query: body => ({
        url: 'auth/change-info',
        credentials: 'include',
        method: 'POST',
        body,
      }),
      transformErrorResponse,
      invalidatesTags: (_, err) => (err ? [] : [currentUserTag]),
    }),
    logIn: builder.mutation<void, LogInDto>({
      query: body => ({
        url: 'auth/login',
        method: 'POST',
        body,
        credentials: 'include',
      }),
      transformErrorResponse,
      invalidatesTags: (_, err) => (err ? [] : [currentUserTag]),
    }),
    signUp: builder.mutation<void, SignUpDto>({
      query: body => ({
        url: 'auth/registration',
        method: 'POST',
        body,
        credentials: 'include',
      }),
      transformErrorResponse,
      invalidatesTags: (_, err) => (err ? [] : [currentUserTag]),
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

export const {
  useCheckAuthQuery,
  useLazyCheckAuthQuery,
  useChangeInfoMutation,
  useLogInMutation,
  useSignUpMutation,
  useSignOutMutation,
} = authApi;
