class NumberUtils {
  static isPositiveNumber(num: number): boolean {
    return num > 0;
  }

  static isNumber(value: any): boolean {
    return typeof value === 'number' && !isNaN(value);
  }
}

export default NumberUtils;
