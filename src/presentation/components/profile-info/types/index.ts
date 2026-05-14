import { ReactElement } from 'react';
import { FlatList } from 'react-native';

import { IUser } from '@domain/models';

export interface ProfileInfoProps {
  user: IUser | null;
  gridRef?: React.RefObject<FlatList | null>;
  actions?: ReactElement;
  placeholder?: ReactElement;
  onPressFollows?: (type: 'follows' | 'followers') => void;
}
