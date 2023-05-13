import { DocumentProps, Head, Html, Main, NextScript } from 'next/document';
import { FC } from 'react';

// TODO: change metadata
// export const metadata = {
//   title: {
//     default: 'Тестирование и оценка знаний',
//     template: '%s | Тестирование и оценка знаний',
//   },
//   description: 'Приложение тестирования и оценки знаний студентов',
// };

export const modalContainerId = 'modals-root';

const Document: FC<DocumentProps> = () => (
  <Html lang='en' className='min-h-[100dvh] bg-gray-50'>
    <Head />
    <body>
      <Main />

      <div id={modalContainerId} />
      <NextScript />
    </body>
  </Html>
);

export default Document;
