import { IAuthSuccess } from '../core/data/auth-data';
import { LocalStorageKey } from '../core/enums/local-storage-key';

export class AuthService {
  public static auth(loginData: IAuthSuccess) {
    const token = loginData?.jwt?.accesToken;
    if (token) {
      localStorage.setItem(LocalStorageKey.TOKEN, token);
    } else {
      throw new Error('No token');
    }
  }
}