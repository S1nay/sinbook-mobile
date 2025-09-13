/* eslint-disable react-native/no-inline-styles */
import { memo, useCallback, useState } from 'react';
import { LayoutChangeEvent, Pressable, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import styles from './styles';
import { SegmentedControlProps } from './types';

const SegmentedControl = (props: SegmentedControlProps) => {
  const { options, selectedOption, optionStyle, style, onPressOption, ...otherProps } = props;

  const [optionsWidth, setOptionsWidth] = useState<Array<number>>([]);

  const changeActiveOptionPosition = ({ nativeEvent }: LayoutChangeEvent, index: number) => {
    const width = nativeEvent.layout.width;

    setOptionsWidth(prev => {
      const copy = [...prev];
      copy[index] = width;
      return copy;
    });
  };

  const renderOption = (option: string, index: number) => {
    const isActive = option === selectedOption;

    return (
      <Pressable
        style={[styles.option, optionStyle]}
        onLayout={(e: LayoutChangeEvent) => changeActiveOptionPosition(e, index)}
        onPress={() => onPressOption(option)}
        key={option + index}
      >
        <Text style={[styles.text, isActive && styles.activeText]}>{option}</Text>
      </Pressable>
    );
  };

  const getLeft = useCallback(
    (index: number) => {
      return optionsWidth.slice(0, index).reduce((acc, w) => acc + w + styles.container.gap, 0);
    },
    [optionsWidth],
  );

  return (
    <View style={[styles.container, style]} {...otherProps}>
      <Animated.View
        style={[
          styles.activeItem,
          {
            width: optionsWidth[options.indexOf(selectedOption)],
            left: getLeft(options.indexOf(selectedOption)),
            transitionProperty: ['left'],
            transitionDuration: 300,
          },
        ]}
      />

      {options.map(renderOption)}
    </View>
  );
};

export default memo(SegmentedControl);
