export function capitalize(str: string): string {
  return str && str.substring(0, 1).toUpperCase() + str.substring(1);
}

export function includesCaseInsensitive(outter: string, inner: string): boolean {
  return outter.toLowerCase().includes(inner.toLowerCase());
}
