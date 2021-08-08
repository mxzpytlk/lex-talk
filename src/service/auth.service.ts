import { IAuthSuccess } from '../core/data/auth-data';
import { LocalStorageKey } from '../core/enums/local-storage-key';
import { setInLocalStorage } from '../core/utils/local-storage.utils';

export class AuthService {
	public static auth(loginData: IAuthSuccess): void {
		const token = loginData?.jwt?.accesToken;
		if (token) {
			setInLocalStorage(LocalStorageKey.TOKEN, token);
		}
	}
}