import { usePathname, useRouter } from 'next/navigation';
import { FC, PropsWithChildren, useMemo } from 'react';

import { Loader } from '@/components/shared';
import { useCheckAuthQuery } from '@/store/api/authApi';
import { User } from '@/types';

import { Routes } from '../../Navbar/navRoutes';

type PagePermissions = 'student-methodist-admin' | 'methodist-admin' | 'admin' | 'unauthorized' | 'common';
type AuthLayoutProps = PropsWithChildren<{
  pagePermission: PagePermissions;
}>;

const checkRolePermissions = (user: User, pagePermission: PagePermissions): boolean => {
  if (pagePermission === 'admin' && user.role !== 'Admin') return false;
  // eslint-disable-next-line sonarjs/prefer-single-boolean-return
  if (pagePermission === 'methodist-admin' && user.role === 'Student') return false;

  return true;
};

export const AuthLayout: FC<AuthLayoutProps> = ({ pagePermission, children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { currentData: userInfo, isLoading, isError: isAuthError, isSuccess: isAuthorized } = useCheckAuthQuery();

  return useMemo(() => {
    if (isLoading && pagePermission !== 'common') return <Loader />;

    const isAuthAndNotAcceptedRole = isAuthorized && checkRolePermissions(userInfo!, pagePermission);
    const onHomePage = pathname === Routes.HOME;
    if (isAuthorized && !isAuthAndNotAcceptedRole && !onHomePage) {
      router.push(Routes.HOME);
      console.info('go home');
      return <Loader />;
    }

    if (isAuthError && pagePermission !== 'unauthorized' && pagePermission !== 'common') {
      router.push(Routes.LOG_IN);
      console.info('go log in');
      return <Loader />;
    }

    if (isAuthorized && pagePermission === 'unauthorized') {
      console.info('just go home, anon');
      router.push(Routes.HOME);
      return <Loader />;
    }

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }, [isLoading, pagePermission, isAuthorized, isAuthError, children, router, userInfo, pathname]);
};
