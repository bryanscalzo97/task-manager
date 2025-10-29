import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, SPACING } from 'src/utils/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: SPACING.xl,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  inputSection: {
    marginBottom: SPACING.xxl,
  },
  prioritySection: {
    marginBottom: SPACING.sm,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: SPACING.sm,
    color: '#222222',
  },
  textInput: {
    borderWidth: 2,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    fontSize: 16,
    minHeight: 120,
    maxHeight: 200,
    backgroundColor: '#FFFFFF',
    borderColor: '#DDDDDD',
    textAlignVertical: 'top',
  },
  priorityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderWidth: 2,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: '#FFFFFF',
    borderColor: '#DDDDDD',
  },
  priorityIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: SPACING.md,
  },
  priorityText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    color: '#222222',
  },
  priorityPicker: {
    marginTop: SPACING.md,
    borderWidth: 2,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: '#FFFFFF',
    borderColor: '#DDDDDD',
  },
  priorityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  priorityDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: SPACING.md,
  },
  priorityOptionText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    color: '#222222',
  },
});
