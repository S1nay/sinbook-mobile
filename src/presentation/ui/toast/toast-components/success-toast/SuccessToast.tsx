import { Text, View } from 'react-native';
import { ToastConfigParams } from 'react-native-toast-message';
import { useUnistyles } from 'react-native-unistyles';

import Icon from '@ui/icon';

import { styles } from './styles';
import CountdownBar from '../countdown-bar';

const SuccessToast = (props: ToastConfigParams<void>) => {
  const { text1, isVisible } = props;
  const { theme } = useUnistyles();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Icon name="checkCircle" size={24} stroke={theme.components.toast.fg} />
        <Text style={styles.success}>{text1}</Text>
      </View>

      <CountdownBar
        duration={3000}
        style={styles.countdownBar}
        borderRadius={0}
        height={3}
        color={theme.components.toast.fg}
        backgroundColor={theme.components.toast.successBg}
        isStart={isVisible}
      />
    </View>
  );
};

export default SuccessToast;
