import { Text, View } from 'react-native';
import { BaseToastProps } from 'react-native-toast-message';

import { Colors } from '@shared/colors';
import Icon from '@ui/icon';

import styles from './styles';

const ErrorToast = ({ text1 }: BaseToastProps) => {
  return (
    <View style={styles.container}>
      <Icon name="warning" size={24} stroke={Colors.white} />
      <Text style={styles.error}>{text1}</Text>
    </View>
  );
};

export default ErrorToast;
