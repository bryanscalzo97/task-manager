export const COLORS = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: '#0a7ea4',
    icon: '#687076',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#fff',
    icon: '#9BA1A6',
  },
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
} as const;

export const OPACITY_TO_HEX: Record<number, string> = {
  0: '00',
  5: '0D',
  10: '1A',
  15: '26',
  20: '33',
  25: '40',
  30: '4D',
  35: '59',
  40: '66',
  45: '73',
  50: '80',
  55: '8C',
  60: '99',
  65: 'A6',
  70: 'B3',
  75: 'BF',
  80: 'CC',
  85: 'D9',
  90: 'E6',
  95: 'F2',
  100: 'FF',
} as const;

export const TASK_PRIORITY_COLORS = {
  High: '#ff4444',
  Medium: '#ffaa00',
  Low: '#44ff44',
} as const;

export const STATS_COLORS = {
  completed: '#34C759',
  pending: '#FF9500',
} as const;
