import { ReactElement } from 'react';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';

export type TOrientation = 'horizontal' | 'vertical';

export interface IItemLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface INormalizedItem {
  value: string;
  label: ReactElement;
  disabled?: boolean;
}

export type TItemConfig = string | INormalizedItem;

export interface SegmentedControlProps extends ViewProps {
  defaultValue: string;
  onValueChange: <T extends string>(value: T) => void;
  disabled?: boolean;
  orientation?: TOrientation;
  style?: StyleProp<Omit<ViewStyle, 'position' | 'flex' | 'flexDirection' | 'overflow'>>;
}
