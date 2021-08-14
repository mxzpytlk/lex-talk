/* eslint-disable @typescript-eslint/no-explicit-any */
import { LocalStorageKey } from '../enums/local-storage-key';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function setInLocalStorage(key: LocalStorageKey, item: any): void {
  if (typeof item === 'object') {
    localStorage.setItem(key, JSON.stringify(item));
  } else {
    localStorage.setItem(key, item);
  }
}

export function getFromLocalStorage(key: LocalStorageKey): any {
  return localStorage.getItem(key);
}

export function getBooleanFromLocalStorage(key: LocalStorageKey): boolean {
  return localStorage.getItem(key) === 'true';
}
