import { IconProps } from '@ui/icon';

export interface IOption {
  title: string;
  onPress: () => void;
  icon?: IconProps;
}

export interface ListOptionsSheetModalProps {
  options: Array<IOption>;
}
