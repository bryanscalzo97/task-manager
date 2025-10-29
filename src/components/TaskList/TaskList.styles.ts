import { StyleSheet } from 'react-native';
import { SPACING } from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: SPACING.sm,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: SPACING.sm,
    textAlign: 'center',
    color: '#ff4444',
  },
  errorSubtext: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
  },
});
