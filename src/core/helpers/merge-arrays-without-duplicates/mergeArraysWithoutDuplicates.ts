/**
 * Merges two arrays without duplicates.
 * Items from `firstArray` are added first; items from `secondArray` are appended only if their key
 * is not already present. On collision, `firstArray` takes precedence.
 *
 * @param firstArray - Base array (takes precedence on collision).
 * @param secondArray - Array to merge in; duplicate entries are skipped.
 * @param key - Object property used as the dedup key. Omit to deduplicate by value identity.
 *
 * @example
 * mergeArraysWithoutDuplicates(oldPosts, newPosts, 'id')
 * mergeArraysWithoutDuplicates([1, 2, 3], [2, 3, 4])
 */
const mergeArraysWithoutDuplicates = <T>(firstArray: T[], secondArray: T[], key?: keyof T): T[] => {
  const map = new Map<unknown, T>();
  const getKey = (item: T): unknown => (key !== undefined ? item[key] : item);

  for (const item of firstArray) {
    map.set(getKey(item), item);
  }

  for (const item of secondArray) {
    const k = getKey(item);
    if (!map.has(k)) map.set(k, item);
  }

  return Array.from(map.values());
};

export default mergeArraysWithoutDuplicates;
