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

const logInRoute = { name: 'Войти', href: Routes.LOG_IN };
const signUpRoute = { name: 'Зарегистрироваться', href: Routes.SIGN_UP };
const settingsRoute = { name: 'Настройки', href: Routes.SETTINGS };
const subjectsRoute = { name: 'Предметы', href: Routes.HOME };
const testsRoute = { name: 'Тесты', href: Routes.TESTS };
const attemptsRoute = { name: 'Попытки тестирований', href: Routes.ATTEMPTS };
const studentsRoute = { name: 'Студенты', href: Routes.STUDENTS };
const usersRoute = { name: 'Пользователи', href: Routes.USERS };

const unAuthRoutes: Readonly<Route[]> = [subjectsRoute, testsRoute, logInRoute, signUpRoute];

const studentRoutes: Readonly<Route[]> = [subjectsRoute, testsRoute, attemptsRoute, settingsRoute];
const methodistRoutes: Readonly<Route[]> = [subjectsRoute, testsRoute, studentsRoute, settingsRoute];
const adminRoutes: Readonly<Route[]> = [subjectsRoute, testsRoute, usersRoute, settingsRoute];

export const navigationByRoles = {
  Unauth: unAuthRoutes,
  Student: studentRoutes,
  Methodist: methodistRoutes,
  Admin: adminRoutes,
} satisfies Record<UserRoles | 'Unauth', Readonly<Route[]>>;
