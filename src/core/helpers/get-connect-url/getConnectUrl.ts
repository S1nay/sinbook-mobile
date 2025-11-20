import { Platform } from 'react-native';

/**
 * Заменяет localhost на 10.0.2.2 в URL только для Android-эмулятора
 * @param {string | undefined} url - Исходный URL (например, http://localhost:3000/api/image.jpg)
 * @returns {string | undefined} - Исправленный URL
 */
const getCorrectUrl = (url?: string): string | undefined => {
  if (!url || typeof url !== 'string') return url;

  if (Platform.OS === 'android' && url.includes('localhost')) {
    return url.replace('localhost', '10.0.2.2');
  }

  return url;
};

export default getCorrectUrl;
