import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from 'src/components/ThemedText';
import { useTaskFilters } from 'src/hooks/useTaskFilters';
import { SortOrder, TaskPriority, TaskStatus } from 'src/models/task';
import { TASK_PRIORITY_COLORS } from 'src/utils/theme';
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

  // Use a fixed primary color for the button that works in both modes
  const buttonColor = '#0a7ea4';

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

  const hasActiveFilters =
    filters.status !== TaskStatus.All || filters.priority !== TaskStatus.All;

  const getPriorityColor = (value: TaskPriority | TaskStatus.All): string => {
    if (value === TaskStatus.All) return tintColor;
    return TASK_PRIORITY_COLORS[value] || tintColor;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={[styles.header, { backgroundColor }]}>
        <TouchableOpacity
          onPress={handleClose}
          style={styles.headerButton}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name='close' size={22} color={textColor} />
        </TouchableOpacity>
        <ThemedText style={[styles.headerTitle, { color: textColor }]}>
          Filters
        </ThemedText>
        <View style={styles.headerButton} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: textColor }]}>
            Status
          </ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipsContainer}
            style={styles.horizontalScroll}
          >
            {STATUS_OPTIONS.map((option) => {
              const isSelected = filters.status === option.value;
              return (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.chip,
                    { backgroundColor },
                    isSelected && [
                      styles.chipSelected,
                      {
                        backgroundColor: tintColor + '15',
                        borderColor: tintColor,
                      },
                    ],
                  ]}
                  onPress={() => setStatusFilter(option.value)}
                  activeOpacity={0.7}
                >
                  <ThemedText
                    style={[
                      styles.chipText,
                      { color: isSelected ? tintColor : textColor },
                      isSelected && styles.chipTextSelected,
                    ]}
                  >
                    {option.label}
                  </ThemedText>
                  {isSelected && (
                    <Ionicons
                      name='checkmark'
                      size={16}
                      color={tintColor}
                      style={styles.chipIcon}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: textColor }]}>
            Priority
          </ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipsContainer}
            style={styles.horizontalScroll}
          >
            {PRIORITY_OPTIONS.map((option) => {
              const isSelected = filters.priority === option.value;
              const priorityColor = getPriorityColor(option.value);
              return (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.chip,
                    { backgroundColor },
                    isSelected && [
                      styles.chipSelected,
                      {
                        backgroundColor: priorityColor + '15',
                        borderColor: priorityColor,
                      },
                    ],
                  ]}
                  onPress={() => setPriorityFilter(option.value)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.priorityDot,
                      { backgroundColor: priorityColor },
                    ]}
                  />
                  <ThemedText
                    style={[
                      styles.chipText,
                      { color: isSelected ? priorityColor : textColor },
                      isSelected && styles.chipTextSelected,
                    ]}
                  >
                    {option.label.replace(' Priority', '')}
                  </ThemedText>
                  {isSelected && (
                    <Ionicons
                      name='checkmark'
                      size={16}
                      color={priorityColor}
                      style={styles.chipIcon}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: textColor }]}>
            Sort by
          </ThemedText>
          <View style={styles.sortContainer}>
            {SORT_OPTIONS.map((option) => {
              const isSelected = filters.sortOrder === option.value;
              return (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.sortOption,
                    { backgroundColor },
                    isSelected && [
                      styles.sortOptionSelected,
                      { borderColor: tintColor },
                    ],
                  ]}
                  onPress={() => setSortOrder(option.value)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={option.icon as any}
                    size={20}
                    color={isSelected ? tintColor : iconColor}
                  />
                  <ThemedText
                    style={[
                      styles.sortOptionText,
                      { color: isSelected ? tintColor : textColor },
                    ]}
                  >
                    {option.label}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor }]}>
        {hasActiveFilters && (
          <TouchableOpacity
            style={[styles.clearButton, { borderColor: iconColor }]}
            onPress={handleReset}
            activeOpacity={0.7}
          >
            <ThemedText style={[styles.clearButtonText, { color: textColor }]}>
              Clear all
            </ThemedText>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.applyButton, { backgroundColor: buttonColor }]}
          onPress={handleClose}
          activeOpacity={0.8}
        >
          <ThemedText style={styles.applyButtonText}>Show tasks</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
