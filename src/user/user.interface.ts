export interface IUser {
  id?: string;
  fullname: string;
  username: string;
  password: string;
  age: number;
  userType: UserRole;
  isActive: boolean;
}

export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
}
