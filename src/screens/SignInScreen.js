import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { COLORS, GLOBAL_STYLES } from '../constants/theme';
import { SignInIllustration } from '../components/Illustrations';
import { AuthService } from '../services/authService';
import { validateSignIn } from '../utils/validation';
import Svg, { Path, Rect } from 'react-native-svg';

const GoogleLogo = () => (
  <Svg width={20} height={20} viewBox="0 0 48 48">
    <Rect x="2" y="2" width="44" height="44" rx="12" fill="#FFFFFF" stroke="#DADCE0" strokeWidth="1.5" />
    <Path fill="#4285F4" d="M44.9 24.5c0-1.7-.2-3.3-.5-4.9H24v9.2h11.7c-.5 2.8-2.1 5.1-4.5 6.7l6.9 5.4c4-3.7 6.8-9.2 6.8-16.4z" />
    <Path fill="#34A853" d="M24 46.5c5.6 0 10.3-1.8 13.7-5l-6.9-5.4c-1.9 1.3-4.2 2-6.8 2-5.2 0-9.7-3.5-11.3-8.3l-7.1 5.5C9.2 42.5 16 46.5 24 46.5z" />
    <Path fill="#FBBC05" d="M12.7 29.8c-.4-1.3-.7-2.7-.7-4.2s.2-2.9.7-4.2V15.9l-7.1 5.5C3.9 24.8 3 28.7 3 32.8s.9 8 2.6 11.4l7.1-5.5z" />
    <Path fill="#EA4335" d="M24 10.5c3.1 0 5.9 1.1 8 3.2l6-6C34.4 4.4 29.6 2.5 24 2.5c-8 0-14.8 4-18.4 11.2l7.1 5.5c1.6-4.8 6.1-8.3 11.3-8.3z" />
  </Svg>
);

export default function SignInScreen({ onNavigate, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const passwordInputRef = useRef(null);

  const handleLogin = async () => {
    setError('');
    setSuccess('');

    const validation = validateSignIn({
      username: username.trim(),
      password,
    });

    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await AuthService.login(username, password);
      if (res.success) {
        setSuccess('Login successful!!...');
        setTimeout(() => {
          onLoginSuccess(res.user, res.token);
        }, 800);
      } else {
        setError(res.message || 'Login failed.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={GLOBAL_STYLES.screenWrapper}>
      
      <SignInIllustration />

      <Text style={GLOBAL_STYLES.title}>Sign In</Text>
      <Text style={styles.subtitle}>Enter valid user name & password to continue</Text>

      <View style={styles.inputLayoutRow}>
        <Feather name="user" size={20} color={COLORS.textPlaceholder} style={styles.inputIcon} />
        <TextInput
          style={GLOBAL_STYLES.input}
          placeholder="User name or Email"
          placeholderTextColor={COLORS.textPlaceholder}
          value={username}
          onChangeText={setUsername}
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

      <TouchableOpacity 
        style={styles.forgotPasswordContainer}
        onPress={() => onNavigate('FORGET_PASSWORD')}
      >
        <Text style={styles.forgotPasswordText}>Forget password</Text>
      </TouchableOpacity>

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
        onPress={handleLogin}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={GLOBAL_STYLES.primaryButtonText}>Login</Text>
        )}
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Or Continue with</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.socialContainer}>
        
        <TouchableOpacity style={styles.socialButton}>
          <GoogleLogo />
          <Text style={{ ...styles.socialButtonText, marginLeft: 8 }}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={20} color={COLORS.facebook} style={styles.iconStyle} />
          <Text style={styles.socialButtonText}>Facebook</Text>
        </TouchableOpacity>

      </View>

      <View style={GLOBAL_STYLES.footerContainer}>
        <Text style={styles.footerText}>Haven't any account? </Text>
        <TouchableOpacity onPress={() => onNavigate('SIGN_UP')}>
          <Text style={GLOBAL_STYLES.footerLinkText}>Sign up</Text>
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
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
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
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    paddingHorizontal: 16,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40,
  },
  socialButton: {
    flex: 0.47,
    height: 52,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    marginRight: 8,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  }
});