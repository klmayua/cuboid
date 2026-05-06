// Mobile Android: TransferScreen

import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, borderRadius } from '../lib/theme';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export function TransferScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Send Money</Text>
        
        <Card variant="glass" style={styles.card}>
          <Text style={styles.label}>Amount</Text>
          <TextInput 
            style={styles.input}
            placeholder="0.00"
            placeholderTextColor={colors.typography.disabled}
            keyboardType="numeric"
          />
          
          <Text style={styles.label}>Recipient Country</Text>
          <TouchableOpacity style={styles.select}>
            <Text style={styles.selectText}>Nigeria</Text>
          </TouchableOpacity>
          
          <Text style={styles.label}>Bank Name</Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter bank name"
            placeholderTextColor={colors.typography.disabled}
          />
          
          <Text style={styles.label}>Account Number</Text>
          <TextInput 
            style={styles.input}
            placeholder="0000000000"
            placeholderTextColor={colors.typography.disabled}
            keyboardType="numeric"
          />
          
          <Button title="Continue" onPress={() => {}} variant="primary" size="lg" />
        </Card>

        <Card variant="glass" style={styles.feesCard}>
          <Text style={styles.feesTitle}>Estimated Fees</Text>
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Transfer Fee</Text>
            <Text style={styles.feeValue}>$25.00</Text>
          </View>
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Exchange Fee</Text>
            <Text style={styles.feeValue}>$12.50</Text>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.dark.midnight },
  content: { flex: 1, padding: spacing.md },
  title: { fontSize: 24, fontWeight: '600', color: colors.typography.primary, marginBottom: spacing.lg },
  card: { marginBottom: spacing.md },
  label: { fontSize: 14, color: colors.typography.muted, marginBottom: spacing.xs },
  input: { backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: colors.glass.border, borderRadius: borderRadius.md, padding: spacing.md, fontSize: 16, color: colors.typography.primary, marginBottom: spacing.md },
  select: { backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: colors.glass.border, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.md },
  selectText: { fontSize: 16, color: colors.typography.primary },
  feesCard: { marginBottom: spacing.lg },
  feesTitle: { fontSize: 14, color: colors.typography.muted, marginBottom: spacing.sm },
  feeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs },
  feeLabel: { fontSize: 14, color: colors.typography.secondary },
  feeValue: { fontSize: 14, color: colors.typography.primary },
});

export default TransferScreen;