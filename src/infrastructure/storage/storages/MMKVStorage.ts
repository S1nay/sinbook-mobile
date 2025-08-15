import { injectable } from 'inversify';
import { Configuration, MMKV } from 'react-native-mmkv';

import type { IStorage } from '../entities';

@injectable()
class MMKVStorage implements IStorage {
  private mmkv: MMKV;

  constructor(config: Configuration) {
    this.mmkv = new MMKV(config);
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
}

export default MMKVStorage;
