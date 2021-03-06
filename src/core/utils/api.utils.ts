import config from '../../assets/config.json';
import { ApiRoute } from '../enums/api-routes';
import { LocalStorageKey } from '../enums/local-storage-key';
import { getFromLocalStorage } from './local-storage.utils';

export const SERVER_URL = config.serverUrl;

export function getUrl(route: ApiRoute | string): string {
  return `${SERVER_URL}/api/${route}`;
}

export function updateAvatarUrl(): string {
  return getUrl(ApiRoute.UPDATE_AVATAR);
}

export function sendImgUrl(contactId: string): string {
  return getUrl(`${ApiRoute.SEND_IMG}/${contactId}`);
}

export function getAuthHeader(): string {
  return `Bearer ${getFromLocalStorage(LocalStorageKey.TOKEN)}`;
}
