import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import CryptoJS from 'crypto-js';

const USERS_KEY = '@auth_users';
const SESSION_KEY = '@auth_session';
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
const JWT_SECRET = 'auth_jwt_secret_key_2026';

function generateJWT(payload) {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };
  const headerB64 = btoa(JSON.stringify(header));
  const payloadB64 = btoa(JSON.stringify(payload));
  const signature = CryptoJS.HmacSHA256(headerB64 + '.' + payloadB64, JWT_SECRET).toString(CryptoJS.enc.Base64);
  return headerB64 + '.' + payloadB64 + '.' + signature;
}

function verifyJWT(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [headerB64, payloadB64, signature] = parts;
    const expectedSig = CryptoJS.HmacSHA256(headerB64 + '.' + payloadB64, JWT_SECRET).toString(CryptoJS.enc.Base64);
    if (signature !== expectedSig) return null;
    const payload = JSON.parse(atob(payloadB64));
    if (payload.exp && Date.now() >= payload.exp) return null;
    return payload;
  } catch (e) {
    return null;
  }
}

async function getUsers() {
  const data = await AsyncStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

async function saveUsers(users) {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export const AuthService = {
  async register(username, fullName, email, password) {
    const users = await getUsers();
    const exists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase() || u.username.toLowerCase() === username.toLowerCase()
    );
    if (exists) {
      return { success: false, message: 'User with this email or username already exists.' };
    }
    const hashedPassword = CryptoJS.SHA256(password).toString();
    const newUser = {
      id: Date.now().toString(),
      username: username.trim().toLowerCase(),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    await saveUsers(users);
    return { success: true, message: 'Registration successful! You can now sign in.' };
  },

  async login(usernameOrEmail, password) {
    const users = await getUsers();
    const hashedInput = CryptoJS.SHA256(password).toString();
    const user = users.find(
      (u) =>
        (u.username.toLowerCase() === usernameOrEmail.trim().toLowerCase() ||
        u.email.toLowerCase() === usernameOrEmail.trim().toLowerCase()) &&
        u.password === hashedInput
    );
    if (!user) {
      return { success: false, message: 'Invalid username/email or password.' };
    }
    const tokenPayload = {
      userId: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
    };
    const token = generateJWT(tokenPayload);
    const sessionData = { token, user: { id: user.id, username: user.username, email: user.email, fullName: user.fullName } };
    await setSession(sessionData);
    return { success: true, token, user: sessionData.user, message: 'Login successful!!' };
  },

  async checkSession() {
    try {
      const sessionData = await getSession();
      if (!sessionData) return { isAuthenticated: false };
      const payload = verifyJWT(sessionData.token);
      if (!payload) {
        await this.logout();
        return { isAuthenticated: false };
      }
      return { isAuthenticated: true, token: sessionData.token, user: sessionData.user };
    } catch (e) {
      return { isAuthenticated: false };
    }
  },

  async logout() {
    await removeSession();
  },

  async requestPasswordReset(email) {
    const users = await getUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user) {
      return { success: false, message: 'No account found with this email address.' };
    }
    const resetToken = generateJWT({ userId: user.id, type: 'password_reset', iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 15 * 60 });
    console.log('Password reset token (simulated email):', resetToken);
    return { success: true, message: 'Password reset link has been sent to your email.' };
  },
};
