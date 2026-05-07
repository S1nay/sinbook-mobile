import { memo, PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { SegmentedControlContext } from './context';
import styles from './styles';
import { SegmentedControlProps, IItemLayout } from './types';

const WZSegmentedControl = (props: PropsWithChildren<SegmentedControlProps>) => {
  const {
    defaultValue,
    disabled = false,
    onValueChange,
    orientation = 'horizontal',
    style,
    children,
  } = props;
  const [value, setValue] = useState(defaultValue);

  const layouts = useSharedValue<Record<string, IItemLayout>>({});

  styles.useVariants({ orientation, disabled });

  const onChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      onValueChange?.(newValue);
    },
    [onValueChange],
  );

  const ctxValue = useMemo(
    () => ({
      value,
      onChange,
      disabled,
      orientation,
      layouts,
    }),
    [value, onChange, disabled, orientation, layouts],
  );

  return (
    <SegmentedControlContext.Provider value={ctxValue}>
      <View style={styles.wrapper}>
        <View style={[styles.content, style]}>{children}</View>
      </View>
    </SegmentedControlContext.Provider>
  );
};

export default memo(WZSegmentedControl);
