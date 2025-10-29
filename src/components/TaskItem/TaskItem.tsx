import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { useDeleteTask, useToggleTask } from '../../api/mutations/tasks';
import { Task, TaskPriority } from '../../models/task';
import { TASK_PRIORITY_COLORS } from '../../utils/theme';
import { useThemeColor } from '../../utils/use-theme-color';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { styles } from './TaskItem.styles';

type TaskItemProps = {
  task: Task;
};

function getPriorityColor(priority: TaskPriority): string {
  return TASK_PRIORITY_COLORS[priority] || '#888888';
}

function getPriorityText(priority: TaskPriority): string {
  switch (priority) {
    case TaskPriority.High:
      return 'High';
    case TaskPriority.Medium:
      return 'Med';
    case TaskPriority.Low:
      return 'Low';
    default:
      return 'N/A';
  }
}

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

  const handleEdit = () => {
    router.push(`/edit-task?id=${task.id}`);
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

          <TouchableOpacity style={styles.actionButton} onPress={handleEdit}>
            <Ionicons name='pencil-outline' size={20} color={iconColor} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
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
