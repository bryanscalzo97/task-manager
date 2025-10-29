import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useTaskFilters } from '../../hooks/useTaskFilters';
import { Task } from '../../models/task';
import { useThemeColor } from '../../utils/use-theme-color';
import { TaskItem } from '../TaskItem';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { styles } from './TaskList.styles';

export function TaskList() {
  const { tasks, filters, isLoading, error, refetch } = useTaskFilters();
  const tintColor = useThemeColor({}, 'tint');

  const renderTask = ({ item }: { item: Task }) => <TaskItem task={item} />;

  const renderEmpty = () => (
    <ThemedView style={styles.emptyContainer}>
      <ThemedText style={styles.emptyText}>
        {isLoading ? 'Loading tasks...' : 'No tasks found'}
      </ThemedText>
      <ThemedText style={styles.emptySubtext}>
        Add a new task to get started!
      </ThemedText>
    </ThemedView>
  );

  const renderError = () => (
    <ThemedView style={styles.errorContainer}>
      <ThemedText style={styles.errorText}>Error loading tasks</ThemedText>
      <ThemedText style={styles.errorSubtext}>
        {error?.message || 'Something went wrong'}
      </ThemedText>
    </ThemedView>
  );

  return (
    <FlatList
      data={error ? [] : tasks}
      renderItem={renderTask}
      keyExtractor={(item) =>
        `${item.id}-${filters.status}-${filters.priority}`
      }
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => refetch()}
          tintColor={tintColor}
          colors={[tintColor]}
        />
      }
      ListEmptyComponent={error ? renderError : renderEmpty}
    />
  );
}
