import Image from 'next/image';

import loaderSvg from './AuthLoader.svg';

export const Loader = () => (
  <div className='flex justify-center items-center flex-grow-[1]'>
    <Image width={150} height={150} alt='loader...' src={loaderSvg} />
  </div>
);
