import { StyleProp, ViewStyle } from 'react-native';

import { IUser } from '@domain/models';

export interface UserCardProps extends IUser {
  onPressUserName: () => void;
  style?: StyleProp<ViewStyle>;
}
