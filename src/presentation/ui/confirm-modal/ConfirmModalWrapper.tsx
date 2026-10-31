import { useImperativeHandle, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

import Button from '@ui/button';

import { ConfirmModalRef } from './ConfirmModal';
import styles from './styles';
import { IConfirmModalParams } from './types';

const ConfirmModalWrapper = () => {
  const [params, setParams] = useState<IConfirmModalParams | null>(null);

  const hide = () => setParams(null);

  useImperativeHandle(ConfirmModalRef, () => ({ show: setParams, hide }));

  const onConfirm = () => {
    params?.onConfirm();
    hide();
  };

  return (
    <Modal
      visible={!!params}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={hide}
    >
      <Pressable style={styles.backdrop} onPress={hide}>
        <Pressable style={styles.container}>
          <Text style={styles.title}>{params?.title}</Text>
          <Text style={styles.message}>{params?.message}</Text>

          <View style={styles.actions}>
            <Button
              style={styles.action}
              variant="secondary"
              size="small"
              value={params?.cancelText ?? 'Cancel'}
              onPress={hide}
            />
            <Button
              style={styles.action}
              size="small"
              value={params?.confirmText ?? 'Confirm'}
              onPress={onConfirm}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ConfirmModalWrapper;
