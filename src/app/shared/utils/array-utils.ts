class ArrayUtils {
  static removeDuplicates<T>(array: T[]): T[] {
    return [...new Set(array)];
  }

  static createArray<T>(length: number, value: T): T[] {
    return Array.from({ length }, () => value);
  }
}

export default ArrayUtils;
