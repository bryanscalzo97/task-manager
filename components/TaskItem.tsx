import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useDeleteTask, useToggleTask } from '@/hooks/useTasks';
import { Task, TaskPriority } from '@/types/task';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

type TaskItemProps = {
  task: Task;
};

const getPriorityColor = (priority: TaskPriority) => {
  switch (priority) {
    case 'High':
      return '#ff4444';
    case 'Medium':
      return '#ffaa00';
    case 'Low':
      return '#44ff44';
    default:
      return '#888888';
  }
};

const getPriorityText = (priority: TaskPriority) => {
  switch (priority) {
    case 'High':
      return 'High';
    case 'Medium':
      return 'Med';
    case 'Low':
      return 'Low';
    default:
      return 'N/A';
  }
};

export function TaskItem({ task }: TaskItemProps) {
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const toggleTask = useToggleTask();
  const deleteTask = useDeleteTask();

  const handleToggle = () => {
    toggleTask.mutate(task.id);
  };

  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteTask.mutate(task.id),
      },
    ]);
  };

  const priorityColor = getPriorityColor(task.priority);
  const priorityText = getPriorityText(task.priority);

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity style={styles.content} onPress={handleToggle}>
        <ThemedView style={styles.leftSection}>
          <ThemedView style={styles.checkbox}>
            {task.completed && (
              <Ionicons name='checkmark' size={16} color={textColor} />
            )}
          </ThemedView>
          <ThemedView style={styles.textSection}>
            <ThemedText
              style={[styles.taskText, task.completed && styles.completedText]}
            >
              {task.text}
            </ThemedText>
            <ThemedText style={styles.dateText}>
              {new Date(task.createdAt).toLocaleDateString()}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.rightSection}>
          <ThemedView
            style={[styles.priorityBadge, { backgroundColor: priorityColor }]}
          >
            <ThemedText style={styles.priorityText}>{priorityText}</ThemedText>
          </ThemedView>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
            disabled={deleteTask.isPending}
          >
            <Ionicons
              name='trash-outline'
              size={20}
              color={deleteTask.isPending ? '#888' : iconColor}
            />
          </TouchableOpacity>
        </ThemedView>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textSection: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  priorityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
  },
});
