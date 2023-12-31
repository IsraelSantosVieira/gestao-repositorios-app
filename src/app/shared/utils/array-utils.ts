class ArrayUtils
{
  static removeDuplicates<T>(array: T[]): T[]
  {
    return [...new Set(array)];
  }

  static createArray<T>(length: number, value: T): T[]
  {
    return Array.from({ length }, () => value);
  }

  static firstOrDefault<T>(array: T[], predicate?: (item: T) => boolean): T | null
  {
    if (predicate)
    {
      const filteredArray = array.filter(predicate);
      return filteredArray.length > 0 ? filteredArray[0] : null;
    }

    return array.length > 0 ? array[0] : null;
  }
}

export default ArrayUtils;
