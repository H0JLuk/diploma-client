import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
import { Provider } from 'react-redux';

import { wrapper } from '@/store';

// const App: FC<AppProps> = ({ Component, pageProps }) => <Component {...pageProps} />;

const App: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <>
      <Head>
        <title>Система тестирования и оценки знаний</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Provider store={store}>
        <Component {...props.pageProps} />
      </Provider>
    </>
  );
};

// export default wrapper.withRedux(App);
export default App;
