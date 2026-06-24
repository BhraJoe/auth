import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS, GLOBAL_STYLES } from '../constants/theme';
import { AuthService } from '../services/authService';
import { validateVerifyToken } from '../utils/validation';

export default function VerifyTokenScreen({ onNavigate, email }) {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerifyToken = async () => {
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const validation = validateVerifyToken({ token, newPassword });
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await AuthService.verifyResetToken(email, token, newPassword);
      if (res.success) {
        setSuccess(res.message);
        setTimeout(() => onNavigate('SIGN_IN'), 2000);
      } else {
        setError(res.message || 'Failed to reset password.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={GLOBAL_STYLES.screenWrapper}>
      <Text style={GLOBAL_STYLES.title}>Reset Password</Text>
      <Text style={styles.subtitleCenter}>
        Enter the 6-digit code sent to {email} and choose a new password.
      </Text>

      <View style={styles.inputLayoutRow}>
        <Feather name="key" size={20} color={COLORS.textPlaceholder} style={styles.inputIcon} />
        <TextInput
          style={GLOBAL_STYLES.input}
          placeholder="Reset Code"
          placeholderTextColor={COLORS.textPlaceholder}
          keyboardType="number-pad"
          maxLength={6}
          value={token}
          onChangeText={setToken}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputLayoutRow}>
        <Feather name="lock" size={20} color={COLORS.textPlaceholder} style={styles.inputIcon} />
        <TextInput
          style={GLOBAL_STYLES.input}
          placeholder="New Password"
          placeholderTextColor={COLORS.textPlaceholder}
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputLayoutRow}>
        <Feather name="lock" size={20} color={COLORS.textPlaceholder} style={styles.inputIcon} />
        <TextInput
          style={GLOBAL_STYLES.input}
          placeholder="Confirm New Password"
          placeholderTextColor={COLORS.textPlaceholder}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCapitalize="none"
        />
      </View>

      {error ? (
        <View style={styles.errorBanner}>
          <Feather name="alert-circle" size={16} color="#EF4444" style={{ marginRight: 8 }} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {success ? (
        <View style={styles.successBanner}>
          <Feather name="check-circle" size={16} color="#10B981" style={{ marginRight: 8 }} />
          <Text style={styles.successText}>{success}</Text>
        </View>
      ) : null}

      <TouchableOpacity
        style={[GLOBAL_STYLES.primaryButton, isSubmitting && { opacity: 0.8 }]}
        onPress={handleVerifyToken}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={GLOBAL_STYLES.primaryButtonText}>Reset Password</Text>
        )}
      </TouchableOpacity>

      <View style={GLOBAL_STYLES.footerContainer}>
        <Text style={styles.footerText}>You remember your password? </Text>
        <TouchableOpacity onPress={() => onNavigate('SIGN_IN')}>
          <Text style={GLOBAL_STYLES.footerLinkText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subtitleCenter: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  inputLayoutRow: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    marginBottom: 16,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    borderColor: '#FCA5A5',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    width: '100%',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F8EB',
    borderColor: '#A7F3D0',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    width: '100%',
  },
  successText: {
    color: '#10B981',
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
});
