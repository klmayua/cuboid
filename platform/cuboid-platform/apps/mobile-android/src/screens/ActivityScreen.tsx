// Mobile: Activity Screen

import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../lib/theme';
import { Card } from '../components/Card';
import { ArrowDownLeft, ArrowUpRight, Shield, RefreshCw } from 'lucide-react-native';

const activities = [
  { id: '1', type: 'received', from: 'Acme Corp', amount: '$5,000.00', status: 'settled', time: '2 min ago' },
  { id: '2', type: 'sent', to: 'Global Ltd', amount: '$12,500.00', status: 'processing', time: '1 hour ago' },
  { id: '3', type: 'exchange', from: 'USD', to: 'GBP', amount: '$8,000.00', status: 'settled', time: '3 hours ago' },
  { id: '4', type: 'escrow', to: 'Trade Escrow', amount: '$25,000.00', status: 'active', time: '1 day ago' },
];

export function ActivityScreen() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'received': return <ArrowDownLeft size={18} color={colors.semantic.success} />;
      case 'sent': return <ArrowUpRight size={18} color={colors.semantic.danger} />;
      case 'exchange': return <RefreshCw size={18} color={colors.brand.lightTrust} />;
      case 'escrow': return <Shield size={18} color={colors.semantic.escrow} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'settled': return colors.semantic.success;
      case 'processing': return colors.semantic.warning;
      case 'active': return colors.semantic.escrow;
      case 'failed': return colors.semantic.danger;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Activity</Text>
      </View>

      <FlatList
        data={activities}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card variant="glass" style={styles.card}>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                {getIcon(item.type)}
              </View>
              <View style={styles.content}>
                <Text style={styles.label}>
                  {item.type === 'received' && `Received from ${item.from}`}
                  {item.type === 'sent' && `Sent to ${item.to}`}
                  {item.type === 'exchange' && `Exchanged ${item.from} to ${item.to}`}
                  {item.type === 'escrow' && `Escrow for ${item.to}`}
                </Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <View style={styles.amountContainer}>
                <Text style={styles.amount}>
                  {item.type === 'received' ? '+' : '-'}{item.amount}
                </Text>
                <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
                  {item.status}
                </Text>
              </View>
            </View>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.dark.midnight },
  header: { padding: spacing.md, paddingTop: spacing.lg },
  title: { fontSize: 24, fontWeight: '600', color: colors.typography.primary },
  list: { padding: spacing.md, paddingTop: 0 },
  card: { marginBottom: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center' },
  iconContainer: {
    width: 36, height: 36, borderRadius: borderRadius.md,
    backgroundColor: colors.glass.surface, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm
  },
  content: { flex: 1 },
  label: { fontSize: 14, color: colors.typography.primary, marginBottom: 2 },
  time: { fontSize: 12, color: colors.typography.muted },
  amountContainer: { alignItems: 'flex-end' },
  amount: { fontSize: 14, fontWeight: '500', color: colors.typography.primary },
  status: { fontSize: 11, marginTop: 2, textTransform: 'capitalize' },
});

export default ActivityScreen;