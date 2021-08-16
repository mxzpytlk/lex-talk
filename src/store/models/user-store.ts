import { loader } from 'graphql.macro';
import { makeAutoObservable } from 'mobx';
import { IAuthSuccess, IRefreshQuery } from '../../core/data/auth-data';
import { IUser } from '../../core/data/user-data';
import { AuthService } from '../../service/auth.service';
import { SERVER_URL } from '../../graphql/';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient, InMemoryCache, from } from 'apollo-boost';
import { authMiddleware } from '../../middleware/auth.middlewre';
import { LocalStorageKey } from '../../core/enums/local-storage-key';

const REFRESH_QUERY = loader('../../graphql/queries/refresh.graphql');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const httpLink: any = createUploadLink({
  uri: `${SERVER_URL}/graphql`,
  credentials: 'include',
});

const refreshClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authMiddleware, httpLink]),
});

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
      const res = await refreshClient.query<IRefreshQuery>({
        query: REFRESH_QUERY
      });
      if (res.data?.refresh) {
        this.auth(res?.data?.refresh);
      }
    // eslint-disable-next-line no-empty
    } catch (e) { 
      const error = e.graphQLErrors?.[0];
      const code = error?.extensions?.code;
      if (code === 'UNAUTHENTICATED') {
        this.setIsAuth(false);
        this.setUser(null);
        localStorage.removeItem(LocalStorageKey.TOKEN);
      }
    }
    return !!this.user;
  }
}