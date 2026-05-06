// Mobile Android: WalletScreen

import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, borderRadius } from '../lib/theme';
import { Card } from '../components/Card';
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export function WalletScreen({ navigation }: any) {
  const wallets = [
    { currency: 'USD', balance: '85,000.00', available: '85,000.00', type: 'Operational' },
    { currency: 'GBP', balance: '42,500.00', available: '42,500.00', type: 'Operational' },
    { currency: 'NGN', balance: '12,750,000', available: '12,500,000', type: 'Escrow' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Wallets</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action}>
            <ArrowUpRight size={20} />
            <Text style={styles.actionText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action}>
            <ArrowDownLeft size={20} />
            <Text style={styles.actionText}>Receive</Text>
          </TouchableOpacity>
        </View>

        {wallets.map((wallet, i) => (
          <Card key={i} variant="glass" style={styles.walletCard}>
            <View style={styles.walletHeader}>
              <Text style={styles.walletCurrency}>{wallet.currency}</Text>
              <Text style={styles.walletType}>{wallet.type}</Text>
            </View>
            <Text style={styles.walletBalance}>${wallet.balance}</Text>
            <Text style={styles.walletAvailable}>Available: ${wallet.available}</Text>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.dark.midnight },
  content: { flex: 1, padding: spacing.md },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  title: { fontSize: 24, fontWeight: '600', color: colors.typography.primary },
  addButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brand.deepTrust, alignItems: 'center', justifyContent: 'center' },
  addButtonText: { fontSize: 24, color: colors.typography.primary },
  actions: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.lg },
  action: { flex: 1, padding: spacing.md, backgroundColor: colors.glass.surface, borderRadius: borderRadius.lg, alignItems: 'center' },
  actionText: { fontSize: 14, color: colors.typography.primary, marginTop: spacing.xs },
  walletCard: { marginBottom: spacing.md },
  walletHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  walletCurrency: { fontSize: 18, fontWeight: '600', color: colors.typography.primary },
  walletType: { fontSize: 12, color: colors.typography.muted },
  walletBalance: { fontSize: 28, fontWeight: '600', color: colors.typography.primary, marginBottom: spacing.xs },
  walletAvailable: { fontSize: 14, color: colors.typography.muted },
});

export default WalletScreen;