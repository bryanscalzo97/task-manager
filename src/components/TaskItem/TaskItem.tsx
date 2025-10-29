import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
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

const SWIPE_THRESHOLD = 80;
const ACTION_BUTTON_WIDTH = 160; // Full width for both buttons side by side

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

// Shared state to track which task is currently swiped open
const openTaskId = { current: null as string | null };

export function TaskItem({ task }: TaskItemProps) {
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');
  const toggleTask = useToggleTask();
  const deleteTask = useDeleteTask();

  const translateX = useSharedValue(0);

  const handleToggle = () => {
    toggleTask.mutate(task.id);
  };

  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteTask.mutate(task.id);
          translateX.value = withSpring(0);
          if (openTaskId.current === task.id) {
            openTaskId.current = null;
          }
        },
      },
    ]);
  };

  const handleEdit = () => {
    translateX.value = withSpring(0);
    if (openTaskId.current === task.id) {
      openTaskId.current = null;
    }
    router.push(`/edit-task?id=${task.id}`);
  };

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onBegin(() => {
      // Close any other open task by resetting the shared state
      if (openTaskId.current && openTaskId.current !== task.id) {
        openTaskId.current = null;
      }
    })
    .onUpdate((event) => {
      // Only allow swiping left (negative translateX)
      if (event.translationX < 0) {
        translateX.value = Math.max(event.translationX, -ACTION_BUTTON_WIDTH);
      } else if (event.translationX > 0 && translateX.value < 0) {
        // Allow swiping right to close
        translateX.value = Math.min(event.translationX, 0);
      }
    })
    .onEnd((event) => {
      const shouldReveal = event.translationX < -SWIPE_THRESHOLD;

      if (shouldReveal) {
        translateX.value = withSpring(-ACTION_BUTTON_WIDTH);
        openTaskId.current = task.id;
      } else {
        translateX.value = withSpring(0);
        if (openTaskId.current === task.id) {
          openTaskId.current = null;
        }
      }
    })
    .onFinalize(() => {
      // Handle finalization if needed
    });

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const priorityColor = getPriorityColor(task.priority);
  const priorityText = getPriorityText(task.priority);

  const borderColor = iconColor + '20'; // Use theme color with opacity

  return (
    <ThemedView
      style={[
        styles.container,
        { borderColor },
        task.completed && styles.completedContainer,
      ]}
    >
      {/* Action buttons behind the card */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[
            styles.actionButtonRevealed,
            { backgroundColor: iconColor + '15' },
          ]}
          onPress={handleEdit}
          activeOpacity={1}
        >
          <Ionicons name='pencil' size={24} color={iconColor} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButtonRevealed,
            {
              backgroundColor: '#ff4444',
            },
            deleteTask.isPending && styles.actionButtonDisabled,
          ]}
          onPress={handleDelete}
          disabled={deleteTask.isPending}
          activeOpacity={1}
        >
          <Ionicons
            name='trash'
            size={24}
            color='white'
            style={{ opacity: deleteTask.isPending ? 0.5 : 1 }}
          />
        </TouchableOpacity>
      </View>

      {/* Main card content */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.cardContent, animatedCardStyle]}>
          <TouchableOpacity
            style={[styles.content, { backgroundColor }]}
            onPress={handleToggle}
            activeOpacity={1}
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
              <Ionicons
                name='chevron-forward-outline'
                size={20}
                color={iconColor}
                style={{ opacity: 0.4 }}
              />
            </ThemedView>
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
    </ThemedView>
  );
}
