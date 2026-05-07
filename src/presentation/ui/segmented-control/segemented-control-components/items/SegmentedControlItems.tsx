import { Fragment, memo, useMemo } from 'react';
import { LayoutChangeEvent, Pressable, Text } from 'react-native';
import { runOnUI } from 'react-native-worklets';

import styles from './styles';
import { SegmentedControlItemsProps } from './types';
import { useSegmentedControl } from '../../context';
import { TItemConfig, INormalizedItem } from '../../types';

const normalizeItems = (items: Array<TItemConfig>): Array<INormalizedItem> => {
  return items.map(item =>
    typeof item === 'string'
      ? { value: item, label: item, disabled: false }
      : { value: item.value, label: item.label, disabled: item.disabled ?? false },
  );
};

const SegmentedControlItems = (props: SegmentedControlItemsProps) => {
  const { items } = props;

  const { value, onChange, disabled, layouts, orientation } = useSegmentedControl();

  const normalizedItems = useMemo(() => normalizeItems(items), [items]);

  const onLayout = (e: LayoutChangeEvent, item: INormalizedItem) => {
    const { x, y, width, height } = e.nativeEvent.layout;

    runOnUI(() => {
      'worklet';
      layouts.value = {
        ...layouts.value,
        [item.value]: { x, y, width, height },
      };
    })();
  };

  const renderItem = (item: INormalizedItem) => {
    const isActive = value === item.value;
    const isDisabled = disabled || item.disabled;

    styles.useVariants({ isDisabled, isActive, orientation });

    return (
      <Pressable
        key={item.value}
        onLayout={e => onLayout(e, item)}
        onPress={() => onChange(item.value)}
        disabled={isDisabled}
        style={styles.trigger}
      >
        {typeof item.label === 'string' ? (
          <Text style={styles.label}>{item.label}</Text>
        ) : (
          item.label
        )}
      </Pressable>
    );
  };

  return <Fragment>{normalizedItems.map(renderItem)}</Fragment>;
};

export default memo(SegmentedControlItems);
