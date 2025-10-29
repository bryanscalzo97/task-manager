import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, SPACING } from 'src/utils/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: -0.5,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxxl,
  },
  section: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: SPACING.md,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  horizontalScroll: {
    marginHorizontal: -SPACING.xl,
    paddingLeft: SPACING.xl,
  },
  chipsContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
    paddingRight: SPACING.xxxl,
    alignItems: 'center',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md + 2,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.1)',
    minHeight: 44,
  },
  chipSelected: {
    borderWidth: 1.5,
  },
  chipText: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
  },
  chipTextSelected: {
    fontWeight: '600',
  },
  chipIcon: {
    marginLeft: SPACING.xs,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.xs,
  },
  sortContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  sortOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg + 2,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.1)',
    gap: SPACING.sm,
    minHeight: 52,
  },
  sortOptionSelected: {
    borderWidth: 1.5,
  },
  sortOptionText: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xl,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.08)',
    gap: SPACING.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
  },
  clearButton: {
    flex: 1,
    paddingVertical: SPACING.lg + 2,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  clearButtonText: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  applyButton: {
    flex: 2,
    paddingVertical: SPACING.lg + 2,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  applyButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.2,
  },
});
