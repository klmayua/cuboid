import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, borderRadius, spacing, shadows } from '../lib/theme';

interface CardProps {
  children: React.ReactNode;
  variant?: 'glass' | 'solid';
  style?: ViewStyle;
}

export function Card({ children, variant = 'glass', style }: CardProps) {
  return (
    <View style={[styles.card, styles[variant], style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  glass: {
    backgroundColor: colors.glass.surface,
    borderWidth: 1,
    borderColor: colors.glass.border,
  },
  solid: {
    backgroundColor: colors.dark.surface,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
  },
});

export default Card;