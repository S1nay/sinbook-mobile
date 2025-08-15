declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL?: string;
    STORAGE_ID?: string;
    STORAGE_ENCRYPTION_KEY?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
