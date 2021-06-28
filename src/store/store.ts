import { loader } from 'graphql.macro';
import { makeAutoObservable } from 'mobx';
import { IAuthSuccess, IRefrshMutation } from '../core/data/auth-data';
import { IUser } from '../core/data/user-data';
import { AuthService } from '../service/auth.service';
import { client } from '../graphql/';
import { timeStamp } from 'console';

const REFRESH_MUTATION = loader('../graphql/mutations/refresh.graphql');

export class Store {
  public user!: IUser;
  public isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  public setIsAuth(isAuth: boolean): void {
    this.isAuth = isAuth;
  }

  public setUser(user: IUser) {
    this.user = user;
  }

  public auth(auth: IAuthSuccess) {
    AuthService.auth(auth);
    this.setIsAuth(true);
    this.setUser(auth?.user);
  }

  public async checkAuth(): Promise<void> {
    try {
      const res = await client.mutate<IRefrshMutation>({
        mutation: REFRESH_MUTATION
      });
      if (res.data?.refresh) {
        this.auth(res?.data?.refresh);
      }
    } catch (e) { } finally { }
  }
}