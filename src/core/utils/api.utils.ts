import config from '../../assets/config.json';
import { ApiRoute } from '../enums/api-routes';
import { LocalStorageKey } from '../enums/local-storage-key';
import { getFromLocalStorage } from './local-storage.utils';

export const SERVER_URL = config.serverUrl;

export function getUrl(route: ApiRoute) {
  return `${SERVER_URL}/api/${route}`;
}

export function updateAvatarUrl() {
  return getUrl(ApiRoute.UPDATE_AVATAR);
}

export function getAuthHeader() {
  return `Bearer ${getFromLocalStorage(LocalStorageKey.TOKEN)}`;
}
