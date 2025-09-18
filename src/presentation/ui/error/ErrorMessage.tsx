import { Text, View } from 'react-native';

import styles from './styles';
import { ErrorMessageProps } from './types';

const ErrorMessage = (props: ErrorMessageProps) => {
  const { message, style } = props;

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default ErrorMessage;
