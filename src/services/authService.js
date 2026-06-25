import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const SESSION_KEY = '@auth_session';
const API_URL = 'http://192.168.174.34:3000/api';

async function setSession(data) {
  try {
    await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(data));
  } catch (e) {
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(data));
  }
}

async function getSession() {
  try {
    const secure = await SecureStore.getItemAsync(SESSION_KEY);
    if (secure) return JSON.parse(secure);
  } catch (e) {}
  try {
    const fallback = await AsyncStorage.getItem(SESSION_KEY);
    if (fallback) return JSON.parse(fallback);
  } catch (e) {}
  return null;
}

async function removeSession() {
  try {
    await SecureStore.deleteItemAsync(SESSION_KEY);
  } catch (e) {}
  try {
    await AsyncStorage.removeItem(SESSION_KEY);
  } catch (e) {}
}

export const AuthService = {
  async register(username, fullName, email, password) {
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, fullName, email, password }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return { success: false, message: 'Network error. Please try again.' };
    }
  },

  async login(usernameOrEmail, password) {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernameOrEmail, password }),
      });
      const data = await res.json();
      if (data.success) {
        const sessionData = { user: data.user, token: 'local-' + data.user.id };
        await setSession(sessionData);
        return { success: true, user: data.user, message: data.message };
      }
      return data;
    } catch (err) {
      return { success: false, message: 'Network error. Please try again.' };
    }
  },

  async checkSession() {
    const sessionData = await getSession();
    if (sessionData && sessionData.user) {
      return { isAuthenticated: true, token: sessionData.token, user: sessionData.user };
    }
    return { isAuthenticated: false };
  },

  async logout() {
    await removeSession();
  },

  async requestPasswordReset(email) {
    try {
      const res = await fetch(`${API_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return { success: false, message: 'Network error. Please try again.' };
    }
  },

  async verifyToken(email, token) {
    try {
      const res = await fetch(`${API_URL}/verify-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return { success: false, message: 'Network error. Please try again.' };
    }
  },

  async resetPassword(email, token, newPassword) {
    try {
      const res = await fetch(`${API_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, newPassword }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return { success: false, message: 'Network error. Please try again.' };
    }
  },
};
