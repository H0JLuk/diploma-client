import { configureStore } from '@reduxjs/toolkit';
import { Context, createWrapper } from 'next-redux-wrapper';

import { commonApi } from './commonApi';

const makeStore = (ctx: Context) =>
  configureStore({
    reducer: {
      [commonApi.reducerPath]: commonApi.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: gDM =>
      gDM({
        thunk: {
          extraArgument: ctx,
        },
      }).concat(commonApi.middleware),
  });

type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);
