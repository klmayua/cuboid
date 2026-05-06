import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, borderRadius } from '../lib/theme';
import { Card } from '../components/Card';

const bottomNavItems = [
  { label: 'Home', icon: '🏠', active: true },
  { label: 'Move', icon: '📤', active: false },
  { label: 'Activity', icon: '📋', active: false },
  { label: 'Trust', icon: '🛡️', active: false },
  { label: 'Profile', icon: '👤', active: false },
];

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back</Text>
            <Text style={styles.name}>John Doe</Text>
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Text>🔔</Text>
          </TouchableOpacity>
        </View>

        <Card variant="glass" style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>$124,500.00</Text>
          <View style={styles.trustBadge}>
            <Text style={styles.trustText}>🛡️ Trust: 92/100</Text>
          </View>
        </Card>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>📤</Text>
            <Text style={styles.actionLabel}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>📥</Text>
            <Text style={styles.actionLabel}>Receive</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>💱</Text>
            <Text style={styles.actionLabel}>Convert</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>🛡️</Text>
            <Text style={styles.actionLabel}>Escrow</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Recent Activity</Text>
        
        {[1, 2, 3].map((i) => (
          <Card key={i} variant="glass" style={styles.activityCard}>
            <View style={styles.activityRow}>
              <View>
                <Text style={styles.activityTitle}>Sent to Global Ltd</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
              <View style={styles.activityAmount}>
                <Text style={styles.amountText}>-$5,000.00</Text>
                <Text style={styles.statusText}>Settled</Text>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>

      <View style={styles.bottomNav}>
        {bottomNavItems.map((item) => (
          <TouchableOpacity key={item.label} style={styles.navItem}>
            <Text style={[styles.navIcon, item.active && styles.navIconActive]}>
              {item.icon}
            </Text>
            <Text style={[styles.navLabel, item.active && styles.navLabelActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.midnight,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  greeting: {
    fontSize: 14,
    color: colors.typography.muted,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.typography.primary,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.glass.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceCard: {
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: colors.typography.muted,
    marginBottom: spacing.xs,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '600',
    color: colors.typography.primary,
    marginBottom: spacing.sm,
  },
  trustBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: 'rgba(0, 184, 217, 0.1)',
    borderRadius: borderRadius.full,
  },
  trustText: {
    fontSize: 12,
    color: colors.semantic.escrow,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  actionButton: {
    alignItems: 'center',
    padding: spacing.md,
    flex: 1,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  actionLabel: {
    fontSize: 12,
    color: colors.typography.secondary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.typography.primary,
    marginBottom: spacing.md,
  },
  activityCard: {
    marginBottom: spacing.sm,
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityTitle: {
    fontSize: 14,
    color: colors.typography.primary,
  },
  activityTime: {
    fontSize: 12,
    color: colors.typography.muted,
  },
  activityAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.typography.primary,
  },
  statusText: {
    fontSize: 12,
    color: colors.semantic.success,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: colors.dark.surface,
    borderTopWidth: 1,
    borderTopColor: colors.glass.border,
    paddingVertical: spacing.sm,
    paddingBottom: spacing.lg,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 2,
    opacity: 0.6,
  },
  navIconActive: {
    opacity: 1,
  },
  navLabel: {
    fontSize: 10,
    color: colors.typography.muted,
  },
  navLabelActive: {
    color: colors.brand.lightTrust,
  },
});

export default HomeScreen;