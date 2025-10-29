import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { styles } from './FloatingActionButton.styles';

type FloatingActionButtonProps = {
  onPress: () => void;
  disabled?: boolean;
};

export function FloatingActionButton({
  onPress,
  disabled = false,
}: FloatingActionButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.fab, disabled && styles.fabDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Ionicons name='add' size={28} color={disabled ? '#888' : 'white'} />
    </TouchableOpacity>
  );
}
