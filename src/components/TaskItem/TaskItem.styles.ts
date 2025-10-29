import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, SPACING } from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  textSection: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: SPACING.xs,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  dateText: {
    fontSize: 12,
    opacity: 0.7,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
    marginRight: SPACING.sm,
  },
  priorityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionButton: {
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    marginLeft: SPACING.xs,
  },
});
