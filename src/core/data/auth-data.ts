import { IJwt } from './jwt-data';
import { IUser } from './user-data';

export interface IAuth {
  email: string;
  password: string;
  repeatPass?: string;
}

export interface IAuthSuccess {
  user: IUser;
  jwt: IJwt;
}

export interface ILoginQuery {
  login: IAuthSuccess;
}

export interface IRegisterMutation {
  register: IAuthSuccess;
}

export interface IRefreshQuery {
  refresh: IAuthSuccess;
}
