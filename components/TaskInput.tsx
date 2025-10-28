import { useThemeColor } from '@/hooks/use-theme-color';
import { useAddTask } from '@/hooks/useTasks';
import { TaskPriority } from '@/types/task';
import { Ionicons } from '@expo/vector-icons';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

const PRIORITY_OPTIONS: {
  label: string;
  value: TaskPriority;
  color: string;
}[] = [
  { label: 'High', value: 'High', color: '#ff4444' },
  { label: 'Medium', value: 'Medium', color: '#ffaa00' },
  { label: 'Low', value: 'Low', color: '#44ff44' },
];

export interface TaskInputRef {
  addTask: () => void;
  isLoading: boolean;
}

export const TaskInput = forwardRef<TaskInputRef>((props, ref) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('Medium');
  const [showPriorityPicker, setShowPriorityPicker] = useState(false);

  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const tintColor = useThemeColor({}, 'tint');

  const addTask = useAddTask();

  const handleAddTask = () => {
    if (text.trim().length === 0) {
      Alert.alert('Validation Error', 'Task text cannot be empty.');
      return;
    }
    addTask.mutate(
      { text, priority },
      {
        onSuccess: () => {
          setText('');
          setPriority('Medium');
          setShowPriorityPicker(false);
        },
        onError: (error) => {
          Alert.alert('Error', `Failed to add task: ${error.message}`);
        },
      }
    );
  };

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    addTask: handleAddTask,
    isLoading: addTask.isPending,
  }));

  const selectedPriority = PRIORITY_OPTIONS.find((p) => p.value === priority);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={[
            styles.textInput,
            {
              color: textColor,
            },
          ]}
          placeholder='Enter a new task...'
          placeholderTextColor={iconColor}
          value={text}
          onChangeText={setText}
          multiline
          maxLength={200}
        />

        <TouchableOpacity
          style={styles.priorityButton}
          onPress={() => setShowPriorityPicker(!showPriorityPicker)}
        >
          <ThemedView
            style={[
              styles.priorityIndicator,
              { backgroundColor: selectedPriority?.color || '#717171' },
            ]}
          />
          <ThemedText style={[styles.priorityText, { color: textColor }]}>
            {selectedPriority?.label || 'Priority'}
          </ThemedText>
          <Ionicons
            name={showPriorityPicker ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={iconColor}
          />
        </TouchableOpacity>
      </ThemedView>

      {showPriorityPicker && (
        <ThemedView style={styles.priorityPicker}>
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
                style={[styles.priorityDot, { backgroundColor: option.color }]}
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
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 48,
    maxHeight: 120,
  },
  priorityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    gap: 6,
  },
  priorityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '500',
  },
  priorityPicker: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  priorityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  priorityOptionText: {
    fontSize: 16,
  },
});
