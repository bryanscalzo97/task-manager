import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, SPACING } from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
