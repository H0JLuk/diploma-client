import { UserRoles } from '@/types';

type Route = {
  name: string;
  href: string;
};

export enum Routes {
  LOG_IN = '/log-in',
  SIGN_UP = '/sign-up',
  SETTINGS = '/settings',
  HOME = '/',
  ATTEMPTS = '/attempts',
  STUDENTS = '/students',
  USERS = '/users',
  TESTS = '/tests',
}

const logInRoute = { name: 'Log in', href: Routes.LOG_IN };
const signUpRoute = { name: 'Sign up', href: Routes.SIGN_UP };
const settingsRoute = { name: 'Settings', href: Routes.SETTINGS };
const subjectsRoute = { name: 'Subjects', href: Routes.HOME };
const attemptsRoute = { name: 'Attempts', href: Routes.ATTEMPTS };
const studentsRoute = { name: 'Students', href: Routes.STUDENTS };
const usersRoute = { name: 'Users', href: Routes.USERS };

const unAuthRoutes: Readonly<Route[]> = [subjectsRoute, logInRoute, signUpRoute];

const studentRoutes: Readonly<Route[]> = [subjectsRoute, attemptsRoute, settingsRoute];
const methodistRoutes: Readonly<Route[]> = [subjectsRoute, studentsRoute, settingsRoute];
const adminRoutes: Readonly<Route[]> = [subjectsRoute, usersRoute, settingsRoute];

export const navigationByRoles = {
  Unauth: unAuthRoutes,
  Student: studentRoutes,
  Methodist: methodistRoutes,
  Admin: adminRoutes,
} satisfies Record<UserRoles | 'Unauth', Readonly<Route[]>>;
