import dateFormat from 'dateformat';

const DATE_FORMAT = 'd/m/yyyy';

export function dateToString(date: Date): string {
  return dateFormat(date, DATE_FORMAT);
}
