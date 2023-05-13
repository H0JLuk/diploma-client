import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { baseQueryWithReauth } from '../api/baseQuery';

const tagTypes = ['current-user', 'subject', 'test', 'user', 'question', 'answer', 'questionType'] as const;

export const commonApi = createApi({
  reducerPath: 'commonApi',
  baseQuery: baseQueryWithReauth,
  tagTypes,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: () => ({}),
});

type ProvidedItem = { id: number | string };
export function providesList<R extends ProvidedItem, T extends (typeof tagTypes)[number]>(
  resultWithId: R | R[] | undefined,
  tagType: T,
) {
  return resultWithId
    ? [
        { type: tagType, id: 'LIST' },
        ...(Array.isArray(resultWithId)
          ? resultWithId.map(item => ({ type: tagType, id: item.id }))
          : [{ type: tagType, id: resultWithId.id }]),
      ]
    : [{ type: tagType, id: 'LIST' }];
}
