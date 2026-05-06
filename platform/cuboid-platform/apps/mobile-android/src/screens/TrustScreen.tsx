// Mobile: Trust Screen

import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../lib/theme';
import { Card } from '../components/Card';

export function TrustScreen() {
  const trustScore = 92;
  const factors = [
    { name: 'Identity', score: 95, label: 'Verified' },
    { name: 'Device', score: 88, label: 'Trusted' },
    { name: 'Behavior', score: 94, label: 'Normal' },
    { name: 'Transaction', score: 90, label: 'Good' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trust Center</Text>
      </View>

      <Card variant="glass" style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>Your Trust Score</Text>
        <Text style={styles.score}>{trustScore}</Text>
        <Text style={styles.scoreMax}>/ 100</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Verified User</Text>
        </View>
      </Card>

      <Text style={styles.sectionTitle}>Trust Factors</Text>

      {factors.map((factor, i) => (
        <Card key={i} variant="glass" style={styles.factorCard}>
          <View style={styles.factorRow}>
            <Text style={styles.factorName}>{factor.name}</Text>
            <Text style={styles.factorLabel}>{factor.label}</Text>
          </View>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${factor.score}%` }]} />
          </View>
        </Card>
      ))}

      <Card variant="glass" style={styles.actionCard}>
        <Text style={styles.actionTitle}>Boost Your Trust</Text>
        <Text style={styles.actionText}>Complete verification to unlock higher limits</Text>
        <View style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Verify Identity</Text>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.dark.midnight, padding: spacing.md },
  header: { marginBottom: spacing.lg },
  title: { fontSize: 24, fontWeight: '600', color: colors.typography.primary },
  scoreCard: { alignItems: 'center', paddingVertical: spacing.xl, marginBottom: spacing.lg },
  scoreLabel: { fontSize: 14, color: colors.typography.muted, marginBottom: spacing.xs },
  score: { fontSize: 64, fontWeight: '700', color: colors.brand.lightTrust },
  scoreMax: { fontSize: 20, color: colors.typography.muted, marginTop: -10 },
  badge: { marginTop: spacing.md, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, backgroundColor: colors.semantic.success + '20', borderRadius: borderRadius.full },
  badgeText: { fontSize: 12, color: colors.semantic.success, fontWeight: '500' },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.typography.primary, marginBottom: spacing.md },
  factorCard: { marginBottom: spacing.sm },
  factorRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  factorName: { fontSize: 14, color: colors.typography.primary },
  factorLabel: { fontSize: 12, color: colors.semantic.success },
  progressBg: { height: 4, backgroundColor: colors.glass.surface, borderRadius: 2 },
  progressFill: { height: 4, backgroundColor: colors.brand.lightTrust, borderRadius: 2 },
  actionCard: { marginTop: spacing.lg },
  actionTitle: { fontSize: 16, fontWeight: '600', color: colors.typography.primary, marginBottom: spacing.xs },
  actionText: { fontSize: 14, color: colors.typography.muted, marginBottom: spacing.md },
  actionButton: { backgroundColor: colors.brand.deepTrust, padding: spacing.md, borderRadius: borderRadius.md, alignItems: 'center' },
  actionButtonText: { fontSize: 14, fontWeight: '600', color: colors.typography.primary },
});

export default TrustScreen;