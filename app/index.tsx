import { router } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { FloatingActionButton } from 'src/components/FloatingActionButton';
import { TaskList } from 'src/components/TaskList';
import { ThemedText } from 'src/components/ThemedText';
import { ThemedView } from 'src/components/ThemedView';
import { ThemeToggle } from 'src/components/ThemeToggle';
import { useTaskFilters } from 'src/hooks/useTaskFilters';
import { STATS_COLORS } from 'src/utils/theme';
import { useThemeColor } from 'src/utils/use-theme-color';
import { styles } from './index.styles';

export default function HomeScreen() {
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');
  const { taskStats } = useTaskFilters();

  const handleAddTask = () => {
    router.push('/add-task');
  };

  const handleOpenFilters = () => {
    router.push('/filters');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor }]}>
        <View style={styles.titleSection}>
          <ThemedText type='title' style={styles.title}>
            Task Manager
          </ThemedText>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={handleOpenFilters}
            style={styles.filterButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name='filter-outline' size={22} color={iconColor} />
          </TouchableOpacity>
          <ThemeToggle />
        </View>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor }]}>
            <View
              style={[
                styles.statIconContainer,
                { backgroundColor: textColor + '10' },
              ]}
            >
              <Ionicons name='layers-outline' size={20} color={textColor} />
            </View>
            <ThemedText style={[styles.statNumber, { color: textColor }]}>
              {taskStats.total.toString()}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: iconColor }]}>
              Total
            </ThemedText>
          </View>

          <View style={[styles.statCard, { backgroundColor }]}>
            <View
              style={[
                styles.statIconContainer,
                { backgroundColor: STATS_COLORS.completed + '20' },
              ]}
            >
              <Ionicons
                name='checkmark-circle-outline'
                size={20}
                color={STATS_COLORS.completed}
              />
            </View>
            <ThemedText
              style={[styles.statNumber, { color: STATS_COLORS.completed }]}
            >
              {taskStats.completed.toString()}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: iconColor }]}>
              Completed
            </ThemedText>
          </View>

          <View style={[styles.statCard, { backgroundColor }]}>
            <View
              style={[
                styles.statIconContainer,
                { backgroundColor: STATS_COLORS.pending + '20' },
              ]}
            >
              <Ionicons
                name='time-outline'
                size={20}
                color={STATS_COLORS.pending}
              />
            </View>
            <ThemedText
              style={[styles.statNumber, { color: STATS_COLORS.pending }]}
            >
              {taskStats.pending.toString()}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: iconColor }]}>
              Pending
            </ThemedText>
          </View>
        </View>
      </View>

      <TaskList />
      <FloatingActionButton onPress={handleAddTask} disabled={false} />
    </ThemedView>
  );
}
