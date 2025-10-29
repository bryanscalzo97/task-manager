import { useTaskFilters } from '@/hooks/useTaskFilters';
import { Task } from '@/types/task';
import React from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { TaskItem } from './TaskItem';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

export function TaskList() {
  const { tasks, filters, isLoading, error, refetch } = useTaskFilters();

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

  if (error) {
    return renderError();
  }

  return (
    <FlatList
      data={tasks}
      renderItem={renderTask}
      keyExtractor={(item) =>
        `${item.id}-${filters.status}-${filters.priority}`
      }
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={() => refetch()} />
      }
      ListEmptyComponent={renderEmpty}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 8,
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
    marginBottom: 8,
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
    marginBottom: 8,
    textAlign: 'center',
    color: '#ff4444',
  },
  errorSubtext: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
  },
});
