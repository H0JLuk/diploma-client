import Image from 'next/image';
import { FC } from 'react';

import loaderSvg from './loader.svg';

export type LoaderProps = { width?: number; height?: number };

export const Loader: FC<LoaderProps> = ({ width = 150, height = 150 }) => (
  <div className='flex justify-center items-center flex-grow-[1]'>
    <Image priority width={width} height={height} alt='loader...' src={loaderSvg} />
  </div>
);
