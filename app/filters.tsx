import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from 'src/components/ThemedText';
import { ThemedView } from 'src/components/ThemedView';
import { useTaskFilters } from 'src/hooks/useTaskFilters';
import { SortOrder, TaskPriority, TaskStatus } from 'src/models/task';
import { STATS_COLORS } from 'src/utils/theme';
import { useThemeColor } from 'src/utils/use-theme-color';
import { styles } from './filters.styles';

const STATUS_OPTIONS: { label: string; value: TaskStatus }[] = [
  { label: 'All Tasks', value: TaskStatus.All },
  { label: 'Completed', value: TaskStatus.Completed },
  { label: 'Pending', value: TaskStatus.Pending },
];

const PRIORITY_OPTIONS: {
  label: string;
  value: TaskPriority | TaskStatus.All;
}[] = [
  { label: 'All Priorities', value: TaskStatus.All },
  { label: 'High Priority', value: TaskPriority.High },
  { label: 'Medium Priority', value: TaskPriority.Medium },
  { label: 'Low Priority', value: TaskPriority.Low },
];

const SORT_OPTIONS: { label: string; value: SortOrder; icon: string }[] = [
  {
    label: 'Newest First',
    value: SortOrder.Desc,
    icon: 'arrow-down-outline',
  },
  { label: 'Oldest First', value: SortOrder.Asc, icon: 'arrow-up-outline' },
];

export default function FiltersScreen() {
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const tintColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');

  const {
    filters,
    setStatusFilter,
    setPriorityFilter,
    setSortOrder,
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
      <ThemedView style={styles.headerActions}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Ionicons name='close' size={24} color={iconColor} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.applyButton, { backgroundColor: tintColor }]}
          onPress={handleClose}
        >
          <ThemedText style={styles.applyButtonText}>Apply</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
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
              <ThemedText
                style={[styles.statNumber, { color: STATS_COLORS.completed }]}
              >
                {taskStats.completed}
              </ThemedText>
              <ThemedText style={[styles.statLabel, { color: iconColor }]}>
                Completed
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.statItem}>
              <ThemedText
                style={[styles.statNumber, { color: STATS_COLORS.pending }]}
              >
                {taskStats.pending}
              </ThemedText>
              <ThemedText style={[styles.statLabel, { color: iconColor }]}>
                Pending
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

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

        <ThemedView style={styles.filterSection}>
          <ThemedText style={[styles.sectionTitle, { color: textColor }]}>
            Sort By Date
          </ThemedText>
          <ThemedView style={styles.optionsContainer}>
            {SORT_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionButton,
                  filters.sortOrder === option.value && styles.selectedOption,
                ]}
                onPress={() => setSortOrder(option.value)}
              >
                <ThemedView style={styles.sortOptionContent}>
                  <Ionicons
                    name={option.icon as any}
                    size={18}
                    color={
                      filters.sortOrder === option.value ? tintColor : iconColor
                    }
                  />
                  <ThemedText
                    style={[
                      styles.optionText,
                      { color: textColor },
                      filters.sortOrder === option.value && styles.selectedText,
                    ]}
                  >
                    {option.label}
                  </ThemedText>
                </ThemedView>
                {filters.sortOrder === option.value && (
                  <Ionicons name='checkmark' size={20} color={tintColor} />
                )}
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ThemedView>
      </ScrollView>

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
