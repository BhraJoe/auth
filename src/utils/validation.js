import { z } from 'zod';

export const signUpSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

export const signInSchema = z.object({
  username: z.string().min(1, 'Please enter your username or email.'),
  password: z.string().min(1, 'Please enter your password.'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
});

export function validateSignUp(data) {
  const result = signUpSchema.safeParse(data);
  if (!result.success) {
    return { valid: false, error: result.error.issues[0].message };
  }
  return { valid: true };
}

export function validateSignIn(data) {
  const result = signInSchema.safeParse(data);
  if (!result.success) {
    return { valid: false, error: result.error.issues[0].message };
  }
  return { valid: true };
}

export const verifyTokenSchema = z.object({
  token: z.string().min(1, 'Please enter the 6-digit code.'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters.'),
});

export function validateVerifyToken(data) {
  const result = verifyTokenSchema.safeParse(data);
  if (!result.success) {
    return { valid: false, error: result.error.issues[0].message };
  }
  return { valid: true };
}

export function validateForgotPassword(data) {
  const result = forgotPasswordSchema.safeParse(data);
  if (!result.success) {
    return { valid: false, error: result.error.issues[0].message };
  }
  return { valid: true };
}
