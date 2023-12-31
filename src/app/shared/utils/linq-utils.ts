export default class Linq {

    static createArray<T>(length: number, value: T): T[]
    {
        return Array.from({ length }, () => value);
    }

    static select<T, TResult>(array: T[], selector: (item: T) => TResult): TResult[] {
        return array.map(selector);
    }

    static where<T>(array: T[], predicate: (item: T) => boolean): T[] {
        return array.filter(predicate);
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

    static first<T>(array: T[], predicate?: (item: T) => boolean): T | undefined {
        if (predicate) {
            return array.find(predicate);
        }
        return array[0];
    }

    static last<T>(array: T[], predicate?: (item: T) => boolean): T | undefined {
        if (predicate) {
            for (let i = array.length - 1; i >= 0; i--) {
                if (predicate(array[i])) {
                    return array[i];
                }
            }
        }
        return array[array.length - 1];
    }

    static groupBy<T, TKey>(array: T[], keySelector: (item: T) => TKey): Map<TKey, T[]> {
        const map = new Map<TKey, T[]>();
        array.forEach((item) => {
            const key = keySelector(item);
            const group = map.get(key);
            if (group) {
                group.push(item);
            } else {
                map.set(key, [item]);
            }
        });
        return map;
    }

    static orderBy<T, TKey>(array: T[], keySelector: (item: T) => TKey): T[] {
        return [...array].sort((a, b) => {
            const keyA = keySelector(a);
            const keyB = keySelector(b);
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
    }

    static any<T>(array: T[], predicate?: (item: T) => boolean): boolean {
        if (predicate) {
            return array.some(predicate);
        }
        return array.length > 0;
    }

    static all<T>(array: T[], predicate: (item: T) => boolean): boolean {
        return array.every(predicate);
    }

    static count<T>(array: T[], predicate?: (item: T) => boolean): number {
        if (predicate) {
            return array.filter(predicate).length;
        }
        return array.length;
    }

    static sum<T>(array: T[], selector: (item: T) => number): number {
        return array.reduce((acc, curr) => acc + selector(curr), 0);
    }

    static max<T>(array: T[], selector: (item: T) => number): number | undefined {
        if (array.length === 0) return undefined;
        return Math.max(...array.map(selector));
    }

    static min<T>(array: T[], selector: (item: T) => number): number | undefined {
        if (array.length === 0) return undefined;
        return Math.min(...array.map(selector));
    }

    static distinct<T>(array: T[], keySelector?: (item: T) => any): T[] {
        const set = new Set();
        return array.filter(item => {
            const key = keySelector ? keySelector(item) : item;
            if (!set.has(key)) {
                set.add(key);
                return true;
            }
            return false;
        });
    }

    static concat<T>(...arrays: T[][]): T[] {
        return arrays.reduce((acc, val) => acc.concat(val), [] as T[]);
    }

    static take<T>(array: T[], count: number): T[] {
        return array.slice(0, count);
    }

    static skip<T>(array: T[], count: number): T[] {
        return array.slice(count);
    }

    static reverse<T>(array: T[]): T[] {
        return [...array].reverse();
    }

    static isEmpty<T>(array: T[]): boolean {
        return array.length === 0;
    }

    static average<T>(array: T[], selector: (item: T) => number): number | undefined {
        if (array.length === 0) return undefined;
        const total = array.reduce((acc, curr) => acc + selector(curr), 0);
        return total / array.length;
    }

    static zip<T1, T2, TResult>(array1: T1[], array2: T2[], resultSelector: (item1: T1, item2: T2) => TResult): TResult[] {
        const length = Math.min(array1.length, array2.length);
        const result = [];
        for (let i = 0; i < length; i++) {
            result.push(resultSelector(array1[i], array2[i]));
        }
        return result;
    }

    static sequenceEqual<T>(array1: T[], array2: T[]): boolean {
        if (array1.length !== array2.length) return false;
        for (let i = 0; i < array1.length; i++) {
            if (array1[i] !== array2[i]) return false;
        }
        return true;
    }

    static union<T>(array1: T[], array2: T[]): T[] {
        return [...new Set([...array1, ...array2])];
    }

    static intersect<T>(array1: T[], array2: T[]): T[] {
        const set2 = new Set(array2);
        return array1.filter(x => set2.has(x));
    }

    static except<T>(array1: T[], array2: T[]): T[] {
        const set2 = new Set(array2);
        return array1.filter(x => !set2.has(x));
    }

    static takeWhile<T>(array: T[], predicate: (item: T) => boolean): T[] {
        const result: T[] = [];
        for (const item of array) {
            if (!predicate(item)) break;
            result.push(item);
        }
        return result;
    }

    static skipWhile<T>(array: T[], predicate: (item: T) => boolean): T[] {
        let skip = true;
        return array.filter(item => {
            if (!skip) return true;
            if (!predicate(item)) {
                skip = false;
                return true;
            }
            return false;
        });
    }

    static selectMany<T, TResult>(array: T[], selector: (item: T) => TResult[]): TResult[] {
        return array.reduce((acc, curr) => [...acc, ...selector(curr)], [] as TResult[]);
    }

    static aggregate<T, TResult>(array: T[], func: (acc: TResult, item: T) => TResult, seed: TResult): TResult {
        return array.reduce(func, seed);
    }

    static elementAt<T>(array: T[], index: number): T | undefined {
        return array.length > index ? array[index] : undefined;
    }

    static contains<T>(array: T[], item: T): boolean {
        return array.includes(item);
    }

    static defaultIfEmpty<T>(array: T[], defaultValue: T): T[] {
        return array.length === 0 ? [defaultValue] : array;
    }

    static orderByDescending<T, TKey>(array: T[], keySelector: (item: T) => TKey): T[] {
        return [...array].sort((a, b) => {
            const keyA = keySelector(a);
            const keyB = keySelector(b);
            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
            return 0;
        });
    }

    static groupJoin<T, TInner, TKey, TResult>(
        outer: T[],
        inner: TInner[],
        outerKeySelector: (outerItem: T) => TKey,
        innerKeySelector: (innerItem: TInner) => TKey,
        resultSelector: (outerItem: T, innerItems: TInner[]) => TResult
    ): TResult[] {
        const lookup = Linq.toLookup(inner, innerKeySelector);
        return outer.map(outerItem => {
            const key = outerKeySelector(outerItem);
            return resultSelector(outerItem, lookup.get(key) || []);
        });
    }

    static join<T, TInner, TKey, TResult>(
        outer: T[],
        inner: TInner[],
        outerKeySelector: (outerItem: T) => TKey,
        innerKeySelector: (innerItem: TInner) => TKey,
        resultSelector: (outerItem: T, innerItem: TInner) => TResult
    ): TResult[] {
        const lookup = Linq.toLookup(inner, innerKeySelector);
        const results: TResult[] = [];
        outer.forEach(outerItem => {
            const key = outerKeySelector(outerItem);
            const innerItems = lookup.get(key) || [];
            innerItems.forEach(innerItem => results.push(resultSelector(outerItem, innerItem)));
        });
        return results;
    }

    static toDictionary<T, TKey, TValue>(
        array: T[],
        keySelector: (item: T) => TKey,
        valueSelector: (item: T) => TValue
    ): Map<TKey, TValue> {
        const map = new Map<TKey, TValue>();
        array.forEach(item => map.set(keySelector(item), valueSelector(item)));
        return map;
    }

    static toLookup<T, TKey>(
        array: T[],
        keySelector: (item: T) => TKey
    ): Map<TKey, T[]> {
        const map = new Map<TKey, T[]>();
        array.forEach(item => {
            const key = keySelector(item);
            const group = map.get(key);
            if (group) {
                group.push(item);
            } else {
                map.set(key, [item]);
            }
        });
        return map;
    }

    static toHashSet<T>(array: T[]): Set<T> {
        return new Set(array);
    }

    static single<T>(array: T[], predicate?: (item: T) => boolean): T | undefined {
        const filtered = predicate ? array.filter(predicate) : array;
        if (filtered.length === 1) {
            return filtered[0];
        }
        return undefined;
    }

    static singleOrDefault<T>(array: T[], predicate: (item: T) => boolean): T | undefined {
        return Linq.single(array, predicate);
    }

    static lastOrDefault<T>(array: T[], predicate?: (item: T) => boolean): T | undefined {
        if (predicate) {
            for (let i = array.length - 1; i >= 0; i--) {
                if (predicate(array[i])) return array[i];
            }
        }
        return array.length > 0 ? array[array.length - 1] : undefined;
    }

}
