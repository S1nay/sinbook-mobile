import { injectable } from 'inversify';
import { Configuration, MMKV } from 'react-native-mmkv';

import type { IStorage } from '@core/interfaces/storage';

@injectable()
class MMKVStorage implements IStorage {
  private mmkv: MMKV;

  constructor(config: Configuration) {
    this.mmkv = new MMKV(config);
  }
  getObject<T extends object>(key: string): T | null {
    const objectString = this.mmkv.getString(key);

    return objectString ? JSON.parse(objectString) : null;
  }

  getString(key: string): string | null {
    return this.mmkv.getString(key) || null;
  }

  getBoolean(key: string): boolean | null {
    return this.mmkv.getBoolean(key) || null;
  }

  getNumber(key: string): number | null {
    return this.mmkv.getNumber(key) || null;
  }

  getArray(key: string): ArrayBufferLike | null {
    return this.mmkv.getBuffer(key) || null;
  }

  set<T extends string | number | boolean | ArrayBuffer>(key: string, value: T): void {
    return this.mmkv.set(key, value);
  }

  delete(key: string): void {
    return this.mmkv.delete(key);
  }

  clear() {
    return this.mmkv.clearAll();
  }
}

export default MMKVStorage;
