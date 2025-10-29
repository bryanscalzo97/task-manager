import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, SPACING } from 'src/utils/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.xl,
    paddingBottom: SPACING.xl,
  },
  statsSection: {
    marginBottom: SPACING.xxxl,
  },
  filterSection: {
    marginBottom: SPACING.xxl,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: SPACING.lg,
    color: '#222222',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8E8E93',
  },
  optionsContainer: {
    gap: SPACING.sm,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: 14,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: '#F2F2F7',
  },
  selectedOption: {
    backgroundColor: '#E3F2FD',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222222',
  },
  selectedText: {
    color: '#1976D2',
    fontWeight: '600',
  },
  sortOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    flex: 1,
  },
  footer: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl,
  },
  resetButton: {
    paddingVertical: 14,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
    borderColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
  },
});
