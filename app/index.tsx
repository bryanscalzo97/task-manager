import { router } from 'expo-router';
import { StyleSheet } from 'react-native';

import { FloatingActionButton } from '@/components/FloatingActionButton';
import { TaskList } from '@/components/TaskList';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const iconColor = useThemeColor({}, 'icon');

  const handleAddTask = () => {
    router.push('/add-task');
  };

  const handleOpenFilters = () => {
    router.push('/filters');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type='title'>Task Manager</ThemedText>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
