import dateFormat from 'dateformat';

const DATE_FORMAT = 'd/m/yyyy';
const DATE_TIME_FORMAT = 'd/m/yyyy HH:MM';

export function dateToString(date: Date): string {
  return dateFormat(date, DATE_FORMAT);
}

export function dateTimeToString(date: Date): string {
  return dateFormat(date, DATE_TIME_FORMAT);
}
