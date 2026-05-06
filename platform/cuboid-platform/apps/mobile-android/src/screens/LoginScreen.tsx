import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { colors, spacing, borderRadius } from '../lib/theme';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export function LoginScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>C</Text>
        <Text style={styles.title}>Cuboid</Text>
      </View>

      <Card variant="glass" style={styles.card}>
        <Text style={styles.heading}>Welcome back</Text>
        <Text style={styles.subheading}>Sign in to continue</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={colors.typography.disabled}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor={colors.typography.disabled}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        <Button title="Sign In" onPress={() => {}} variant="primary" size="lg" />
      </Card>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.link}>Create account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.midnight,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logo: {
    fontSize: 64,
    fontWeight: '700',
    color: colors.brand.deepTrust,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: colors.typography.primary,
    marginTop: spacing.sm,
  },
  card: {
    marginBottom: spacing.lg,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.typography.primary,
    marginBottom: spacing.xs,
  },
  subheading: {
    fontSize: 16,
    color: colors.typography.muted,
    marginBottom: spacing.xl,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.typography.secondary,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: colors.glass.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: 16,
    color: colors.typography.primary,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
  },
  forgotText: {
    fontSize: 14,
    color: colors.brand.lightTrust,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  footerText: {
    fontSize: 14,
    color: colors.typography.muted,
  },
  link: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.brand.lightTrust,
  },
});

export default LoginScreen;