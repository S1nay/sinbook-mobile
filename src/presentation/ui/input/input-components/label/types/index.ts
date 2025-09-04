import { GetInputConfigReturnType } from '@ui/input/types';

export interface LabelProps {
  label: string;
  isFocused: boolean;
  config: GetInputConfigReturnType;
  value: string;
}
