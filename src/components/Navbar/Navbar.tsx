import Image from 'next/image';
import Link from 'next/link';
import { FC, useMemo, useState } from 'react';

import menuSvg from '@/assets/menu.svg';
import { useCheckAuthQuery, useSignOutMutation } from '@/store/api/authApi';

import { Button } from '../shared';
import bookIcon from './book.svg';
import { navigationByRoles } from './navRoutes';

export const Navbar: FC = () => {
  const [isNavbarOpened, setNavbarOpen] = useState(false);

  const [signOutMutation, { isLoading: isSignOutLoading }] = useSignOutMutation();
  const { currentData: userData, isLoading: isCheckAuthLoading, isSuccess: isAuthorized } = useCheckAuthQuery();

  const navigation = useMemo(() => {
    if (isCheckAuthLoading) return [];
    if (!isAuthorized || !userData) return navigationByRoles.Unauth;
    return navigationByRoles[userData.role];
  }, [userData, isCheckAuthLoading, isAuthorized]);

  const handleToggleNavbar = () => setNavbarOpen(isOpen => !isOpen);

  return (
    <nav className='flex flex-wrap items-center justify-between px-2 py-3 sticky top-0 z-10 bg-pink-500 mb-3'>
      <div className='container px-4 mx-auto flex flex-wrap items-center justify-between'>
        <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
          <div className='flex items-center'>
            <Image width={30} height={30} src={bookIcon} alt='logo' />
            <p className='ml-4 text-white'>{userData?.name}</p>
          </div>

          <button
            className='text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
            type='button'
            onClick={handleToggleNavbar}
          >
            <Image src={menuSvg} width={30} height={30} alt='navbar' />
          </button>
        </div>
        <div className={`lg:flex flex-grow items-center ${isNavbarOpened ? 'flex' : 'hidden'}`}>
          <ul className='flex flex-col lg:flex-row list-none lg:ml-auto'>
            {navigation.map(({ name, href }) => (
              <li className='nav-item' key={name}>
                <Link
                  className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                  href={href}
                >
                  <span className='ml-2'>{name}</span>
                </Link>
              </li>
            ))}
            {isAuthorized && (
              <li className='nav-item'>
                <Button
                  variant='clear'
                  onClick={() => signOutMutation()}
                  disabled={isSignOutLoading}
                  className='px-3 py-2 ml-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                >
                  &#8676;&nbsp;&nbsp;Sign out
                </Button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
