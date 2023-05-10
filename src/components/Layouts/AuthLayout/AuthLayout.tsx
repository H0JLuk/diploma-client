import { useRouter } from 'next/navigation';
import { FC, PropsWithChildren, useEffect } from 'react';

import { useCheckAuthQuery } from '@/store/api/authApi';

import { Routes } from '../../Navbar/navRoutes';
import { Loader } from './Loader';

type AuthLayoutProps = PropsWithChildren<{
  pagePermission: 'authorized' | 'unauthorized' | 'common';
}>;

export const AuthLayout: FC<AuthLayoutProps> = ({ pagePermission, children }) => {
  const router = useRouter();

  const { isLoading, isSuccess: isAuthorized } = useCheckAuthQuery();

  useEffect(() => {
    if (isLoading) return;

    if (isAuthorized && pagePermission === 'unauthorized') {
      router.push(Routes.HOME);
    }
    if (!isAuthorized && pagePermission === 'authorized') {
      router.push(Routes.LOG_IN);
    }
  }, [isLoading, router, isAuthorized, pagePermission]);

  if (isLoading && pagePermission !== 'common') return <Loader />;

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
