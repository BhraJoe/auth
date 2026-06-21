import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS, GLOBAL_STYLES } from '../constants/theme';
import { SignUpIllustration } from '../components/Illustrations';
import { AuthService } from '../services/authService';

export default function SignUpScreen({ onNavigate }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const passwordInputRef = useRef(null);

  const handleSignUp = async () => {
    setError('');
    setSuccess('');

    if (!fullName.trim() || !email.trim() || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      const username = email.trim().split('@')[0];
      const res = await AuthService.register(username, fullName, email, password);

      if (res.success) {
        setSuccess(res.message);
        setTimeout(() => {
          onNavigate('SIGN_IN');
        }, 1500);
      } else {
        setError(res.message || 'Registration failed.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={GLOBAL_STYLES.screenWrapper}>
      <SignUpIllustration />

      <Text style={GLOBAL_STYLES.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Use proper information to continue</Text>

      <View style={styles.inputLayoutRow}>
        <Feather name="user" size={20} color={COLORS.textPlaceholder} style={styles.inputIcon} />
        <TextInput
          style={GLOBAL_STYLES.input}
          placeholder="Full name"
          placeholderTextColor={COLORS.textPlaceholder}
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

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

      <View style={styles.inputLayoutRow}>
        <Feather name="lock" size={20} color={COLORS.textPlaceholder} style={styles.inputIcon} />
        <TextInput
          ref={passwordInputRef}
          style={[GLOBAL_STYLES.input, { flex: 1 }]}
          placeholder="Password"
          placeholderTextColor={COLORS.textPlaceholder}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.passwordToggle}
          onPress={() => {
            setShowPassword(prev => !prev);
            setTimeout(() => passwordInputRef.current?.focus(), 0);
          }}
        >
          <Feather 
            name={showPassword ? "eye" : "eye-off"} 
            size={18} 
            color={COLORS.textPlaceholder} 
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.termsText}>
        By signing up, you are agree to our{' '}
        <Text style={styles.termsHighlightText}>Terms & Conditions</Text> and{' '}
        <Text style={styles.termsHighlightText}>Privacy Policy</Text>
      </Text>

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
        onPress={handleSignUp}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={GLOBAL_STYLES.primaryButtonText}>Create Account</Text>
        )}
      </TouchableOpacity>

      <View style={GLOBAL_STYLES.footerContainer}>
        <Text style={GLOBAL_STYLES.footerText}>Already have an Account? </Text>
        <TouchableOpacity onPress={() => onNavigate('SIGN_IN')}>
          <Text style={GLOBAL_STYLES.footerLinkText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 32,
    textAlign: 'center',
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
  passwordToggle: {
    paddingHorizontal: 8,
  },
  termsText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  termsHighlightText: {
    color: COLORS.primary,
    fontWeight: '500',
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