/**
 * Client-side form validation for auth pages.
 * Runs before hitting Supabase to give instant feedback.
 */

export interface ValidationResult {
  valid: boolean;
  error: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): ValidationResult {
  const trimmed = email.trim();
  if (!trimmed) return { valid: false, error: "Email is required." };
  if (!EMAIL_RE.test(trimmed))
    return { valid: false, error: "Please enter a valid email address." };
  return { valid: true, error: "" };
}

export function validatePassword(password: string): ValidationResult {
  if (!password) return { valid: false, error: "Password is required." };
  if (password.length < 6)
    return { valid: false, error: "Password must be at least 6 characters." };
  return { valid: true, error: "" };
}

export function validateConfirmPassword(
  password: string,
  confirm: string
): ValidationResult {
  if (!confirm)
    return { valid: false, error: "Please confirm your password." };
  if (password !== confirm)
    return { valid: false, error: "Passwords do not match." };
  return { valid: true, error: "" };
}
