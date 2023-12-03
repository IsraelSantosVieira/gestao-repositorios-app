class DateUtils
{
  static formatDate(date: Date): string
  {
    return date.toLocaleDateString();
  }
}

export default DateUtils;
