import { memo, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

import Input from '@ui/input';

import styles from './styles';
import { SearchInputProps } from './types';

const SearchInput = ({ onDebouncedChange, debounceMs = 400 }: SearchInputProps) => {
  const [value, setValue] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const handleChange = (text: string) => {
    setValue(text);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onDebouncedChange(text), debounceMs);
  };

  return (
    <View style={styles.container}>
      <Input
        label=""
        variant="outlined-transparent"
        value={value}
        onChangeText={handleChange}
        placeholder={'Search'}
        startIcon={{ name: 'search', size: 18 }}
      />
    </View>
  );
};

export default memo(SearchInput);
