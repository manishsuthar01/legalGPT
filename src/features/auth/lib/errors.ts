/**
 * Maps raw Supabase auth error messages to user-friendly messages.
 * Centralised so every auth form shows consistent copy.
 */

const ERROR_MAP: Record<string, string> = {
  "Invalid login credentials":
    "The email or password you entered is incorrect. Please try again.",
  "Email not confirmed":
    "Your email hasn't been verified yet. Please check your inbox.",
  "User already registered":
    "An account with this email already exists. Try logging in instead.",
  "Password should be at least 6 characters":
    "Your password must be at least 6 characters long.",
  "Unable to validate email address: invalid format":
    "Please enter a valid email address.",
  "Signup requires a valid password":
    "Please enter a valid password.",
  "Email rate limit exceeded":
    "Too many attempts. Please wait a few minutes before trying again.",
  "For security purposes, you can only request this once every 60 seconds":
    "Too many attempts. Please wait 60 seconds before trying again.",
};

export function getAuthErrorMessage(error: { message: string } | null): string {
  if (!error) return "";

  const raw = error.message;

  // Exact match first
  if (ERROR_MAP[raw]) return ERROR_MAP[raw];

  // Partial/case-insensitive match
  const lowerRaw = raw.toLowerCase();
  for (const [key, friendly] of Object.entries(ERROR_MAP)) {
    if (lowerRaw.includes(key.toLowerCase())) return friendly;
  }

  // Network / generic fallbacks
  if (lowerRaw.includes("fetch") || lowerRaw.includes("network")) {
    return "Unable to connect. Please check your internet connection and try again.";
  }

  // Fallback — still avoid exposing raw internals
  return "Something went wrong. Please try again.";
}
