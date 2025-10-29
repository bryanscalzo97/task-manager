import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useThemeColor } from '../../utils/use-theme-color';
import { styles } from './ThemeToggle.styles';

type ThemeToggleProps = {
  size?: number;
};

export function ThemeToggle({ size = 24 }: ThemeToggleProps) {
  const { themeMode, setThemeMode } = useTheme();
  const iconColor = useThemeColor({}, 'icon');

  const handleToggle = () => {
    if (themeMode === 'light') {
      setThemeMode('dark');
    } else if (themeMode === 'dark') {
      setThemeMode('system');
    } else {
      setThemeMode('light');
    }
  };

  const getIconName = () => {
    switch (themeMode) {
      case 'light':
        return 'sunny' as const;
      case 'dark':
        return 'moon' as const;
      case 'system':
        return 'phone-portrait' as const;
      default:
        return 'sunny' as const;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleToggle}>
      <Ionicons name={getIconName()} size={size} color={iconColor} />
    </TouchableOpacity>
  );
}
