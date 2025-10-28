import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useTaskFilters } from '@/hooks/useTaskFilters';
import { TaskPriority, TaskStatus } from '@/types/task';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const STATUS_OPTIONS: { label: string; value: TaskStatus }[] = [
  { label: 'All Tasks', value: 'All' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Pending', value: 'Pending' },
];

const PRIORITY_OPTIONS: { label: string; value: TaskPriority | 'All' }[] = [
  { label: 'All Priorities', value: 'All' },
  { label: 'High Priority', value: 'High' },
  { label: 'Medium Priority', value: 'Medium' },
  { label: 'Low Priority', value: 'Low' },
];

export default function FiltersScreen() {
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const tintColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');
  const surfaceColor = useThemeColor({}, 'surface');

  const {
    filters,
    setStatusFilter,
    setPriorityFilter,
    resetFilters,
    taskStats,
  } = useTaskFilters();

  const handleClose = () => {
    router.back();
  };

  const handleReset = () => {
    resetFilters();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Ionicons name='close' size={24} color={iconColor} />
        </TouchableOpacity>
        <ThemedText style={[styles.title, { color: textColor }]}>
          Filter Tasks
        </ThemedText>
        <TouchableOpacity
          style={[styles.applyButton, { backgroundColor: tintColor }]}
          onPress={handleClose}
        >
          <ThemedText style={styles.applyButtonText}>Apply</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.content}>
        {/* Task Statistics */}
        <ThemedView style={styles.statsSection}>
          <ThemedText style={[styles.sectionTitle, { color: textColor }]}>
            Task Overview
          </ThemedText>
          <ThemedView style={styles.statsContainer}>
            <ThemedView style={styles.statItem}>
              <ThemedText style={[styles.statNumber, { color: tintColor }]}>
                {taskStats.total}
              </ThemedText>
              <ThemedText style={[styles.statLabel, { color: iconColor }]}>
                Total
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.statItem}>
              <ThemedText style={[styles.statNumber, { color: '#34C759' }]}>
                {taskStats.completed}
              </ThemedText>
              <ThemedText style={[styles.statLabel, { color: iconColor }]}>
                Completed
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.statItem}>
              <ThemedText style={[styles.statNumber, { color: '#FF9500' }]}>
                {taskStats.pending}
              </ThemedText>
              <ThemedText style={[styles.statLabel, { color: iconColor }]}>
                Pending
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        {/* Status Filter */}
        <ThemedView style={styles.filterSection}>
          <ThemedText style={[styles.sectionTitle, { color: textColor }]}>
            Status
          </ThemedText>
          <ThemedView style={styles.optionsContainer}>
            {STATUS_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionButton,
                  { backgroundColor: surfaceColor },
                  filters.status === option.value && styles.selectedOption,
                ]}
                onPress={() => setStatusFilter(option.value)}
              >
                <ThemedText
                  style={[
                    styles.optionText,
                    { color: textColor },
                    filters.status === option.value && styles.selectedText,
                  ]}
                >
                  {option.label}
                </ThemedText>
                {filters.status === option.value && (
                  <Ionicons name='checkmark' size={20} color={tintColor} />
                )}
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ThemedView>

        {/* Priority Filter */}
        <ThemedView style={styles.filterSection}>
          <ThemedText style={[styles.sectionTitle, { color: textColor }]}>
            Priority
          </ThemedText>
          <ThemedView style={styles.optionsContainer}>
            {PRIORITY_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionButton,
                  { backgroundColor: surfaceColor },
                  filters.priority === option.value && styles.selectedOption,
                ]}
                onPress={() => setPriorityFilter(option.value)}
              >
                <ThemedText
                  style={[
                    styles.optionText,
                    { color: textColor },
                    filters.priority === option.value && styles.selectedText,
                  ]}
                >
                  {option.label}
                </ThemedText>
                {filters.priority === option.value && (
                  <Ionicons name='checkmark' size={20} color={tintColor} />
                )}
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.footer}>
        <TouchableOpacity
          style={[styles.resetButton, { borderColor: iconColor }]}
          onPress={handleReset}
        >
          <ThemedText style={[styles.resetButtonText, { color: textColor }]}>
            Reset Filters
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222222',
  },
  applyButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsSection: {
    marginBottom: 32,
  },
  filterSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
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
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8E8E93',
  },
  optionsContainer: {
    gap: 8,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
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
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  resetButton: {
    paddingVertical: 14,
    borderRadius: 12,
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
