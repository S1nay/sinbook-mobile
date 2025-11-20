/**
 * Merge two arrays of objects preserving order and removing duplicates by a key.
 *
 * @example
 * mergeArraysWithoutDuplicates<Post, 'id'>(oldPosts, newPosts, 'id')
 */
const mergeArraysWithoutDuplicates = <T, K extends keyof T>(
  firstArray: Array<T>,
  secondArray: Array<T>,
  key: K,
): Array<T> => {
  const map = new Map<string | number, T>();

  for (const item of firstArray) {
    map.set(String(item[key]), item);
  }

  for (const item of secondArray) {
    const k = String(item[key]);
    if (!map.has(k)) map.set(k, item);
  }

  return Array.from(map.values());
};

export default mergeArraysWithoutDuplicates;
