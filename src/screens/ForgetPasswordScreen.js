import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS, GLOBAL_STYLES } from '../constants/theme';
import { ForgotPasswordIllustration } from '../components/Illustrations';
import { AuthService } from '../services/authService';
import { validateForgotPassword } from '../utils/validation';
import Toast from 'react-native-toast-message';

export default function ForgetPasswordScreen({ onNavigate, onSendResetEmail }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResetPassword = async () => {
    setError('');

    const validation = validateForgotPassword({
      email: email.trim(),
    });

    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await AuthService.requestPasswordReset(email);
      if (res.success) {
        Toast.show({
          type: 'success',
          text1: res.message,
        });
        onSendResetEmail(email);
        setTimeout(() => onNavigate('VERIFY_TOKEN'), 1500);
      } else {
        setError(res.message || 'Failed to request password reset.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={GLOBAL_STYLES.screenWrapper}>
      <ForgotPasswordIllustration />

      <Text style={GLOBAL_STYLES.title}>Forget Password</Text>
      <Text style={styles.subtitleCenter}>
        Don't worry it happens. Please enter the address associate with your account
      </Text>

      <View style={styles.inputLayoutRow}>
        <Feather name="mail" size={20} color={COLORS.textPlaceholder} style={styles.inputIcon} />
        <TextInput
          style={GLOBAL_STYLES.input}
          placeholder="Email address"
          placeholderTextColor={COLORS.textPlaceholder}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>

      {error ? (
        <View style={styles.errorBanner}>
          <Feather name="alert-circle" size={16} color="#EF4444" style={{ marginRight: 8 }} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <TouchableOpacity 
        style={[GLOBAL_STYLES.primaryButton, isSubmitting && { opacity: 0.8 }]}
        onPress={handleResetPassword}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={GLOBAL_STYLES.primaryButtonText}>Send OTP</Text>
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
});