export interface IStorage {
  getString(key: string): string | null;
  getBoolean(key: string): boolean | null;
  getNumber(key: string): number | null;
  getArray(key: string): ArrayBufferLike | null;

  set<T extends string | number | boolean | ArrayBuffer>(key: string, value: T): void;

  delete(key: string): void;
}
