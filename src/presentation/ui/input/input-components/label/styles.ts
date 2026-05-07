import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(({ components, typography }) => ({
  label: {
    fontSize: typography.size.sm,
    variants: {
      isError: {
        true: { color: components.input.label.error },
        false: { color: components.input.label.default },
      },
    },
  },
}));
