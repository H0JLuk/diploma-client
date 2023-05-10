import { Inter } from 'next/font/google';
import { FC, PropsWithChildren } from 'react';

import { Navbar } from '@/components/Navbar';

// const inter = Inter({ subsets: ['latin'] });

export const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <Navbar />
    <div className='flex flex-col flex-grow-[1] w-full container px-2 mx-auto'>{children}</div>
  </>
);
