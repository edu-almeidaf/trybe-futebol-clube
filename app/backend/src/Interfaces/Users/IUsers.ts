export interface Ilogin {
  email: string;
  password: string;
}

export interface IUsers extends Ilogin {
  id: number;
  username: string;
  role: string
}

export type IUserResponse = Omit<IUsers, 'password'>;
