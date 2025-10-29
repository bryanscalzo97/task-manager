import { useTheme } from '../contexts/ThemeContext';
import { COLORS } from './theme';

type ColorName = keyof typeof COLORS.light & keyof typeof COLORS.dark;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ColorName
) {
  const { isDark } = useTheme();
  const theme = isDark ? 'dark' : 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return COLORS[theme][colorName];
  }
}
