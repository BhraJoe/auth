import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import ToastProvider, { Toast } from './src/components/ToastProvider';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgetPasswordScreen from './src/screens/ForgetPasswordScreen';
import VerifyTokenScreen from './src/screens/VerifyTokenScreen';
import MainTabs from './src/navigation/MainTabs';
import { AuthService } from './src/services/authService';
import { COLORS } from './src/constants/theme';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('SIGN_IN');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Check storage on mount for active JWT session
  useEffect(() => {
    async function initializeSession() {
      try {
        const session = await AuthService.checkSession();
        if (session.isAuthenticated) {
          setUser(session.user);
          setToken(session.token);
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.error('Error restoring session:', e);
      } finally {
        setIsLoading(false);
      }
    }
    initializeSession();
  }, []);

  const handleLoginSuccess = (userData, sessionToken) => {
    setUser(userData);
    setToken(sessionToken);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await AuthService.logout();
    Toast.show({
      type: 'success',
      text1: 'Logged out successfully',
    });
    setUser(null);
    setToken('');
    setIsAuthenticated(false);
    setCurrentScreen('SIGN_IN');
  };

  const renderScreen = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Verifying session...</Text>
        </View>
      );
    }

    if (isAuthenticated) {
      return <MainTabs user={user} onLogout={handleLogout} />;
    }

    switch (currentScreen) {
      case 'SIGN_IN':
        return <SignInScreen onNavigate={setCurrentScreen} onLoginSuccess={handleLoginSuccess} />;
      case 'SIGN_UP':
        return <SignUpScreen onNavigate={setCurrentScreen} />;
      case 'FORGET_PASSWORD':
        return <ForgetPasswordScreen onNavigate={setCurrentScreen} onSendResetEmail={setResetEmail} />;
      case 'VERIFY_TOKEN':
        return <VerifyTokenScreen onNavigate={setCurrentScreen} email={resetEmail} />;
      default:
        return <SignInScreen onNavigate={setCurrentScreen} onLoginSuccess={handleLoginSuccess} />;
    }
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          {!isLoading && !isAuthenticated ? (
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1 }}
            >
              <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {renderScreen()}
              </ScrollView>
            </KeyboardAvoidingView>
          ) : (
            renderScreen()
          )}
          <ToastProvider />
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
});
