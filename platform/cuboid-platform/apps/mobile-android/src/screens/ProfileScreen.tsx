// Mobile: Profile Screen

import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { colors, spacing, borderRadius } from '../lib/theme';
import { Card } from '../components/Card';
import { User, Shield, Bell, Key, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

export function ProfileScreen({ navigation }: any) {
  const menuItems = [
    { icon: User, label: 'Personal Info', desc: 'Name, email, phone' },
    { icon: Shield, label: 'Security', desc: 'Password, MFA' },
    { icon: Bell, label: 'Notifications', desc: 'Push, email settings' },
    { icon: Key, label: 'API Keys', desc: 'Manage your keys' },
    { icon: HelpCircle, label: 'Help & Support', desc: 'Contact us' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <Card variant="glass" style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john@example.com</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Business Account</Text>
        </View>
      </Card>

      <Card variant="glass" style={styles.menuCard}>
        {menuItems.map((item, i) => (
          <TouchableOpacity key={i} style={styles.menuItem}>
            <View style={styles.menuRow}>
              <View style={styles.menuIcon}>
                <item.icon size={18} color={colors.typography.muted} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuDesc}>{item.desc}</Text>
              </View>
              <ChevronRight size={16} color={colors.typography.muted} />
            </View>
          </TouchableOpacity>
        ))}
      </Card>

      <TouchableOpacity style={styles.logoutButton}>
        <LogOut size={18} color={colors.semantic.danger} />
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Cuboid v1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.dark.midnight, padding: spacing.md },
  header: { marginBottom: spacing.lg },
  title: { fontSize: 24, fontWeight: '600', color: colors.typography.primary },
  profileCard: { alignItems: 'center', paddingVertical: spacing.xl, marginBottom: spacing.lg },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.brand.deepTrust, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
  avatarText: { fontSize: 24, fontWeight: '600', color: colors.typography.primary },
  name: { fontSize: 18, fontWeight: '600', color: colors.typography.primary, marginBottom: spacing.xs },
  email: { fontSize: 14, color: colors.typography.muted, marginBottom: spacing.sm },
  badge: { backgroundColor: colors.brand.lightTrust + '20', paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.full },
  badgeText: { fontSize: 12, color: colors.brand.lightTrust },
  menuCard: { padding: 0, marginBottom: spacing.lg },
  menuItem: { borderBottomWidth: 1, borderBottomColor: colors.glass.border },
  menuRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md },
  menuIcon: { width: 36, height: 36, borderRadius: borderRadius.md, backgroundColor: colors.glass.surface, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm },
  menuContent: { flex: 1 },
  menuLabel: { fontSize: 14, fontWeight: '500', color: colors.typography.primary },
  menuDesc: { fontSize: 12, color: colors.typography.muted },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: spacing.md, borderWidth: 1, borderColor: colors.semantic.danger + '30', borderRadius: borderRadius.md, marginBottom: spacing.lg },
  logoutText: { fontSize: 14, fontWeight: '500', color: colors.semantic.danger, marginLeft: spacing.sm },
  version: { fontSize: 12, color: colors.typography.muted, textAlign: 'center' },
});

export default ProfileScreen;