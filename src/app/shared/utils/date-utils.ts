class DateUtils
{
  static readonly FORMAT_DATE_ISO: string = "YYYY-MM-DD";
  static readonly FORMAT_DATE_BR: string = "DD/MM/YYYY";
  static readonly FORMAT_DATE_US: string = "MM/DD/YYYY";
  static readonly FORMAT_DATETIME_ISO: string = "YYYY-MM-DD HH:mm:ss";
  static readonly FORMAT_DATETIME_BR: string = "DD/MM/YYYY HH:mm:ss";
  static readonly FORMAT_DATETIME_US: string = "MM/DD/YYYY HH:mm:ss";

  static readonly MILLISECONDS_PER_SECOND: number = 1000;
  static readonly SECONDS_PER_MINUTE: number = 60;
  static readonly MINUTES_PER_HOUR: number = 60;
  static readonly HOURS_PER_DAY: number = 24;
  static readonly DAYS_PER_WEEK: number = 7;
  static readonly DAYS_PER_MONTH: number = 30;
  static readonly MONTHS_PER_YEAR: number = 12;


  static formatDateToLocale(date: Date): string
  {
    return date.toLocaleDateString();
  }

  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static subtractDays(date: Date, days: number): Date {
    return DateUtils.addDays(date, -days);
  }

  static formatDate(date: Date, format: string): string {
    return format
        .replace('YYYY', date.getFullYear().toString())
        .replace('MM', (date.getMonth() + 1).toString().padStart(2, '0'))
        .replace('DD', date.getDate().toString().padStart(2, '0'))
        .replace('HH', date.getHours().toString().padStart(2, '0'))
        .replace('mm', date.getMinutes().toString().padStart(2, '0'))
        .replace('ss', date.getSeconds().toString().padStart(2, '0'));
  }

  static compareDates(date1: Date, date2: Date): number {
    const d1 = date1.getTime();
    const d2 = date2.getTime();
    return d1 > d2 ? 1 : d1 < d2 ? -1 : 0;
  }

  static isBefore(date1: Date, date2: Date): boolean {
    return DateUtils.compareDates(date1, date2) === -1;
  }

  static isAfter(date1: Date, date2: Date): boolean {
    return DateUtils.compareDates(date1, date2) === 1;
  }

  static differenceInDays(date1: Date, date2: Date): number {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  static differenceInMinutes(date1: Date, date2: Date): number {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60));
  }

  static differenceInHours(date1: Date, date2: Date): number {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60));
  }

  static parseDate(dateString: string): Date {
    return new Date(dateString);
  }

  static adjustToTimezone(date: Date, timezoneOffset: number): Date {
    const localTime = date.getTime();
    const localOffset = date.getTimezoneOffset() * 60000; // offset em milissegundos
    const utc = localTime + localOffset;
    const targetTime = utc + (3600000 * timezoneOffset);
    return new Date(targetTime);
  }

  static toUTC(date: Date): Date {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
        date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  }

  static toBrTimezone(date: Date): Date {
    return DateUtils.adjustToTimezone(date, -3);
  }

  static startOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  static endOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
  }

  static addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  }

  static subtractMonths(date: Date, months: number): Date {
    return DateUtils.addMonths(date, -months);
  }

  static addYears(date: Date, years: number): Date {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result;
  }

  static subtractYears(date: Date, years: number): Date {
    return DateUtils.addYears(date, -years);
  }

  static toReadableString(date: Date): string {
    return date.toLocaleDateString(undefined, { day: '2-digit', month: 'long', year: 'numeric' });
  }
}

export default DateUtils;
