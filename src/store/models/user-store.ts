import { loader } from 'graphql.macro';
import { makeAutoObservable } from 'mobx';
import { IAuthSuccess, IRefreshQuery } from '../../core/data/auth-data';
import { IUser } from '../../core/data/user-data';
import { AuthService } from '../../service/auth.service';
import { client } from '../../graphql/';

const REFRESH_QUERY = loader('../../graphql/queries/refresh.graphql');

export class UserStore {
  public user!: IUser | null;
  public isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  public setIsAuth(isAuth: boolean): void {
    this.isAuth = isAuth;
  }

  public setUser(user: IUser | null): void {
    this.user = user;
  }

  public setAvatar(avatar: string): void {
    if (this.user) {
      this.user.avatar = avatar;
    }
  }

  public auth(auth: IAuthSuccess): void {
    AuthService.auth(auth);
    this.setIsAuth(auth?.user?.isActivated);
    this.setUser(auth?.user);
  }

  public get isDetails(): boolean {
    return !!(this.user?.about && this.user.avatar && this.user.name);
  }

  public async checkAuth(): Promise<boolean> {
    try {
      const res = await client.query<IRefreshQuery>({
        query: REFRESH_QUERY
      });
      if (res.data?.refresh) {
        this.auth(res?.data?.refresh);
      }
    // eslint-disable-next-line no-empty
    } catch (e) { }
    return !!this.user;
  }
}