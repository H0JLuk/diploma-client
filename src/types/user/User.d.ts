export type User = {
  id: number;
  name: string;
  login: string;
  role: UserRoles;
  deleted: boolean;
  isActivated: boolean;
};

export type UserRoles = 'Student' | 'Methodist' | 'Admin';
