import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useEditTask, useTasks } from '@/hooks/useTasks';
import { TaskPriority } from '@/types/task';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PRIORITY_OPTIONS: {
  label: string;
  value: TaskPriority;
  color: string;
}[] = [
  { label: 'High', value: 'High', color: '#ff4444' },
  { label: 'Medium', value: 'Medium', color: '#ffaa00' },
  { label: 'Low', value: 'Low', color: '#44ff44' },
];

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: tasks = [] } = useTasks();
  const task = tasks.find((t) => t.id === id);

  const [text, setText] = useState(task?.text || '');
  const [priority, setPriority] = useState<TaskPriority>(
    task?.priority || 'Medium'
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
        <ThemedView style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Ionicons name='close' size={24} color={iconColor} />
          </TouchableOpacity>
          <ThemedText style={[styles.title, { color: textColor }]}>
            Edit Task
          </ThemedText>
          <ThemedView style={{ width: 60 }} />
        </ThemedView>
        <ThemedView style={styles.errorContainer}>
          <ThemedText style={[styles.errorText, { color: textColor }]}>
            Task not found
          </ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Ionicons name='close' size={24} color={iconColor} />
        </TouchableOpacity>
        <ThemedText style={[styles.title, { color: textColor }]}>
          Edit Task
        </ThemedText>
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

      <ThemedView style={styles.content}>
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
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  inputSection: {
    marginBottom: 24,
  },
  prioritySection: {
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#222222',
  },
  textInput: {
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    minHeight: 120,
    maxHeight: 200,
    backgroundColor: '#FFFFFF',
    borderColor: '#DDDDDD',
    textAlignVertical: 'top',
  },
  priorityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderColor: '#DDDDDD',
  },
  priorityIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  priorityText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    color: '#222222',
  },
  priorityPicker: {
    marginTop: 12,
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderColor: '#DDDDDD',
  },
  priorityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  priorityDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  priorityOptionText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    color: '#222222',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
