import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEditTask } from 'src/api';
import { useTasks } from 'src/api/queries/tasks';
import { ThemedText } from 'src/components/ThemedText';
import { ThemedView } from 'src/components/ThemedView';
import { TaskPriority } from 'src/models/task';
import { TASK_PRIORITY_COLORS } from 'src/utils/theme';
import { useThemeColor } from 'src/utils/use-theme-color';
import { styles } from './edit-task.styles';

const PRIORITY_OPTIONS: {
  label: string;
  value: TaskPriority;
  color: string;
}[] = [
  { label: 'High', value: TaskPriority.High, color: TASK_PRIORITY_COLORS.High },
  {
    label: 'Medium',
    value: TaskPriority.Medium,
    color: TASK_PRIORITY_COLORS.Medium,
  },
  { label: 'Low', value: TaskPriority.Low, color: TASK_PRIORITY_COLORS.Low },
];

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: tasks = [] } = useTasks();
  const task = tasks.find((t) => t.id === id);

  const [text, setText] = useState(task?.text || '');
  const [priority, setPriority] = useState<TaskPriority>(
    task?.priority || TaskPriority.Medium
  );
  const [showPriorityPicker, setShowPriorityPicker] = useState(false);

  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const tintColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');

  const editTask = useEditTask();

  useEffect(() => {
    if (task) {
      setText(task.text);
      setPriority(task.priority);
    }
  }, [task]);

  const handleEditTask = () => {
    if (!id || !task) {
      Alert.alert('Error', 'Task not found');
      return;
    }

    if (text.trim().length === 0) {
      Alert.alert('Validation Error', 'Task text cannot be empty.');
      return;
    }

    editTask.mutate(
      { id, text, priority },
      {
        onSuccess: () => {
          router.back();
        },
        onError: (error) => {
          Alert.alert('Error', `Failed to edit task: ${error.message}`);
        },
      }
    );
  };

  const handleClose = () => {
    router.back();
  };

  const selectedPriority = PRIORITY_OPTIONS.find((p) => p.value === priority);

  if (!task) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <ThemedView style={styles.content}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Ionicons name='close' size={24} color={iconColor} />
          </TouchableOpacity>
          <ThemedView style={styles.errorContainer}>
            <ThemedText style={[styles.errorText, { color: textColor }]}>
              Task not found
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ThemedView style={styles.content}>
        <ThemedView style={styles.headerActions}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Ionicons name='close' size={24} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.saveButton,
              editTask.isPending && styles.saveButtonDisabled,
              { backgroundColor: tintColor },
            ]}
            onPress={handleEditTask}
            disabled={editTask.isPending}
          >
            <ThemedText style={styles.saveButtonText}>
              {editTask.isPending ? 'Saving...' : 'Save'}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
        <ThemedView style={styles.inputSection}>
          <ThemedText style={[styles.label, { color: textColor }]}>
            Task Description
          </ThemedText>
          <TextInput
            style={[
              styles.textInput,
              {
                color: textColor,
                borderColor: iconColor,
                backgroundColor: backgroundColor,
              },
            ]}
            placeholder='Enter task description...'
            placeholderTextColor={iconColor}
            value={text}
            onChangeText={setText}
            multiline
            maxLength={200}
            autoFocus
          />
        </ThemedView>

        <ThemedView style={styles.prioritySection}>
          <ThemedText style={[styles.label, { color: textColor }]}>
            Priority
          </ThemedText>
          <TouchableOpacity
            style={[
              styles.priorityButton,
              { borderColor: iconColor, backgroundColor: backgroundColor },
            ]}
            onPress={() => setShowPriorityPicker(!showPriorityPicker)}
          >
            <ThemedView
              style={[
                styles.priorityIndicator,
                {
                  backgroundColor: selectedPriority?.color || '#717171',
                },
              ]}
            />
            <ThemedText style={[styles.priorityText, { color: textColor }]}>
              {selectedPriority?.label || 'Priority'}
            </ThemedText>
            <Ionicons
              name={showPriorityPicker ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={iconColor}
            />
          </TouchableOpacity>

          {showPriorityPicker && (
            <ThemedView
              style={[
                styles.priorityPicker,
                {
                  borderColor: iconColor,
                  backgroundColor: backgroundColor,
                },
              ]}
            >
              {PRIORITY_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={styles.priorityOption}
                  onPress={() => {
                    setPriority(option.value);
                    setShowPriorityPicker(false);
                  }}
                >
                  <ThemedView
                    style={[
                      styles.priorityDot,
                      { backgroundColor: option.color },
                    ]}
                  />
                  <ThemedText
                    style={[styles.priorityOptionText, { color: textColor }]}
                  >
                    {option.label}
                  </ThemedText>
                  {priority === option.value && (
                    <Ionicons name='checkmark' size={20} color={tintColor} />
                  )}
                </TouchableOpacity>
              ))}
            </ThemedView>
          )}
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}
