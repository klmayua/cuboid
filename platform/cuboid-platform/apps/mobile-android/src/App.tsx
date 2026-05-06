import React, { useState } from 'react';
import { StatusBar, SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { colors } from './lib/theme';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { WalletScreen } from './screens/WalletScreen';
import { TransferScreen } from './screens/TransferScreen';
import { ActivityScreen } from './screens/ActivityScreen';
import { TrustScreen } from './screens/TrustScreen';
import { ProfileScreen } from './screens/ProfileScreen';

type Screen = 'Login' | 'Home' | 'Wallet' | 'Transfer' | 'Activity' | 'Trust' | 'Profile';

const navItems = [
  { key: 'Home', label: 'Home', icon: '🏠' },
  { key: 'Transfer', label: 'Move', icon: '📤' },
  { key: 'Activity', label: 'Activity', icon: '📋' },
  { key: 'Trust', label: 'Trust', icon: '🛡️' },
  { key: 'Profile', label: 'Profile', icon: '👤' },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('Home');

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.dark.midnight} />
        <LoginScreen navigation={{ navigate: () => setIsAuthenticated(true) }} />
      </SafeAreaView>
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home': return <HomeScreen />;
      case 'Wallet': return <WalletScreen />;
      case 'Transfer': return <TransferScreen />;
      case 'Activity': return <ActivityScreen />;
      case 'Trust': return <TrustScreen />;
      case 'Profile': return <ProfileScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.dark.midnight} />
      <View style={styles.content}>
        {renderScreen()}
      </View>
      <View style={styles.bottomNav}>
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={styles.navItem}
            onPress={() => setCurrentScreen(item.key as Screen)}
          >
            <Text style={[styles.navIcon, currentScreen === item.key && styles.navIconActive]}>
              {item.icon}
            </Text>
            <Text style={[styles.navLabel, currentScreen === item.key && styles.navLabelActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.dark.midnight },
  content: { flex: 1 },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: colors.dark.surface,
    borderTopWidth: 1,
    borderTopColor: colors.glass.border,
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    paddingTop: 8,
  },
  navItem: { flex: 1, alignItems: 'center', paddingVertical: 4 },
  navIcon: { fontSize: 20, marginBottom: 2, opacity: 0.5 },
  navIconActive: { opacity: 1 },
  navLabel: { fontSize: 10, color: colors.typography.muted },
  navLabelActive: { color: colors.brand.lightTrust },
});