import { router } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { FloatingActionButton } from 'src/components/FloatingActionButton';
import { TaskList } from 'src/components/TaskList';
import { ThemedText } from 'src/components/ThemedText';
import { ThemedView } from 'src/components/ThemedView';
import { ThemeToggle } from 'src/components/ThemeToggle';
import { useTaskFilters } from 'src/hooks/useTaskFilters';
import { useThemeColor } from 'src/utils/use-theme-color';
import { styles } from './index.styles';

export default function HomeScreen() {
  const iconColor = useThemeColor({}, 'icon');
  const tintColor = useThemeColor({}, 'tint');
  const { taskStats } = useTaskFilters();

  const handleAddTask = () => {
    router.push('/add-task');
  };

  const handleOpenFilters = () => {
    router.push('/filters');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedView style={styles.titleSection}>
          <ThemedText type='title'>Task Manager</ThemedText>
          {taskStats.pending > 0 && (
            <View style={[styles.badge, { backgroundColor: tintColor }]}>
              <ThemedText style={styles.badgeText}>
                {taskStats.pending} {taskStats.pending === 1 ? 'task' : 'tasks'}
              </ThemedText>
            </View>
          )}
        </ThemedView>
        <ThemedView style={styles.headerActions}>
          <TouchableOpacity
            onPress={handleOpenFilters}
            style={styles.filterButton}
          >
            <Ionicons name='filter-outline' size={24} color={iconColor} />
          </TouchableOpacity>
          <ThemeToggle />
        </ThemedView>
      </ThemedView>

      <TaskList />
      <FloatingActionButton onPress={handleAddTask} disabled={false} />
    </ThemedView>
  );
}
