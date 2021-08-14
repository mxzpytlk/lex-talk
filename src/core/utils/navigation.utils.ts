import { RouterPath } from '../enums/router-path';

type HrefParams = {
  [key: string]: string | number
}

export function createHref(path: RouterPath, hrefParams?: HrefParams): string {
  let resultHref: string = path;
  if (hrefParams) {
    const keys = Object.keys(hrefParams);
    for (const key of keys) {
      resultHref = resultHref.replace(`:${key}`, `${hrefParams[key]}`);
    }
  }
  return resultHref;
}

export function findHrefParam(href: string, routerPath: RouterPath, key: string): string {
  const routerPathNodes = routerPath.split('/');
  const paramIdx = routerPathNodes.findIndex((node) => node.replace(':', '') === key);
  return href.split('/')[paramIdx];
}
