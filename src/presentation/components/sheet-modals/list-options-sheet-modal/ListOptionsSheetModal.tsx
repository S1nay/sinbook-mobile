import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { ListRenderItemInfo, Pressable, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Icon from '@ui/icon';

import styles from './styles';
import { IOption, ListOptionsSheetModalProps } from './types';

const ListOptionsSheetModal = (props: ListOptionsSheetModalProps) => {
  const { options } = props;

  const insets = useSafeAreaInsets();

  const renderOption = useCallback(
    ({ item: option }: ListRenderItemInfo<IOption>) => {
      return (
        <Pressable style={styles.item} onPress={option.onPress}>
          {option.icon && <Icon {...option.icon} />}
          <Text style={styles.text}>{option.title}</Text>
        </Pressable>
      );
    },
    [options],
  );

  return (
    <BottomSheetFlatList
      data={options}
      renderItem={renderOption}
      contentContainerStyle={[styles.container, { paddingBottom: insets.bottom }]}
    />
  );
};

export default ListOptionsSheetModal;
