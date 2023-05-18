import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { IncomingMessage } from 'http';
import { AppContext } from 'next/app';
import type { NextPageContext } from 'next/types';

const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/`;

const mutex = new Mutex();

// const isObject = (obj: unknown): obj is object => !!obj && typeof obj === 'object';
// const isNextPageContext = (ctx: unknown): ctx is NextPageContext =>
//   !!(isObject(ctx) && 'req' in ctx && ctx.req instanceof IncomingMessage);
// const isAppContext = (ctx: unknown): ctx is AppContext =>
//   !!(isObject(ctx) && 'ctx' in ctx && isObject(ctx.ctx) && 'req' in ctx.ctx && !!ctx.ctx.req);

const baseQuery = fetchBaseQuery({
  baseUrl,
  // prepareHeaders(headers, api) {
  //   const ctx = api.extra;
  //   let req: IncomingMessage | undefined;

  //   if (isNextPageContext(ctx)) {
  //     req = ctx.req;
  //   } else if (isAppContext(ctx)) {
  //     req = ctx.ctx.req;
  //   }

  //   if (req) {
  //     headers.set('Cookie', req.headers.cookie || '');
  //   }

  //   return headers;
  // },
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (mutex.isLocked()) {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    } else {
      const releaseMutex = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          { url: 'auth/refresh', method: 'POST', credentials: 'include' },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch({ type: 'authApi/signOut' });
        }
      } finally {
        releaseMutex();
      }
    }
  }

  return result;
};

export const transformErrorResponse = (err: FetchBaseQueryError): string => {
  if (typeof err.data === 'object' && err.data && 'message' in err.data) {
    return err.data.message as string;
  }

  if (typeof err.data === 'string') return err.data;
  if ('message' in err && typeof err.message === 'string') return err.message;

  return 'Server error...';
};
