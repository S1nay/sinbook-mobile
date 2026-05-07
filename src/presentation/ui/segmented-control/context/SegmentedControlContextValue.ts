import { SharedValue } from 'react-native-reanimated';

import { IItemLayout, TOrientation } from '../types';

export interface SegmentedControlContextValue {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  orientation?: TOrientation;
  layouts: SharedValue<Record<string, IItemLayout>>;
}
