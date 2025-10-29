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
  const backgroundColor = useThemeColor({}, 'background');
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
    <ThemedView
      style={[
        styles.container,
        { backgroundColor },
        task.completed && styles.completedContainer,
      ]}
    >
      <TouchableOpacity
        style={styles.content}
        onPress={handleToggle}
        activeOpacity={0.7}
      >
        <ThemedView style={styles.leftSection}>
          <ThemedView
            style={[
              styles.checkbox,
              task.completed && styles.checkboxCompleted,
              { borderColor: iconColor },
            ]}
          >
            {task.completed && (
              <Ionicons name='checkmark' size={18} color={priorityColor} />
            )}
          </ThemedView>
          <ThemedView style={styles.textSection}>
            <ThemedText
              style={[
                styles.taskText,
                task.completed && styles.completedText,
                { color: textColor },
              ]}
            >
              {task.text}
            </ThemedText>
            <ThemedView style={styles.metadataRow}>
              <ThemedView style={styles.priorityIndicator}>
                <ThemedView
                  style={[
                    styles.priorityDot,
                    { backgroundColor: priorityColor },
                  ]}
                />
                <ThemedText
                  style={[styles.priorityLabel, { color: iconColor }]}
                >
                  {priorityText}
                </ThemedText>
              </ThemedView>
              <ThemedText style={[styles.dateText, { color: iconColor }]}>
                {new Date(task.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.rightSection}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor }]}
            onPress={handleEdit}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name='pencil-outline' size={18} color={iconColor} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor },
              deleteTask.isPending && styles.actionButtonDisabled,
            ]}
            onPress={handleDelete}
            disabled={deleteTask.isPending}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name='trash-outline'
              size={18}
              color={deleteTask.isPending ? iconColor + '80' : iconColor}
            />
          </TouchableOpacity>
        </ThemedView>
      </TouchableOpacity>
    </ThemedView>
  );
}
