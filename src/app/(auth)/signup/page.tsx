'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Eye, EyeOff, ArrowRight, Loader2, AlertCircle, CheckCircle2, Mail, Lock, ShieldCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/features/auth/store/useAuthstore';
import { getAuthErrorMessage } from '@/features/auth/lib/errors';
import { validateEmail, validatePassword, validateConfirmPassword } from '@/features/auth/lib/validation';

export default function SignupPage() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    if (user) {
      router.replace('/app/contracts/new');
    }
  }, [user, router]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailConfirmation, setEmailConfirmation] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});

  if (user) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    // Client-side validation
    const emailResult = validateEmail(email);
    const passwordResult = validatePassword(password);
    const confirmResult = validateConfirmPassword(password, confirmPassword);

    if (!emailResult.valid || !passwordResult.valid || !confirmResult.valid) {
      setFieldErrors({
        email: emailResult.valid ? undefined : emailResult.error,
        password: passwordResult.valid ? undefined : passwordResult.error,
        confirmPassword: confirmResult.valid ? undefined : confirmResult.error,
      });
      return;
    }

    setLoading(true);

    try {
      const supabase = await createClient();
      const { data, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (authError) {
        setError(getAuthErrorMessage(authError));
        setLoading(false);
        return;
      }

      // If identities array is empty, the user already exists (Supabase behaviour)
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        setError('An account with this email already exists. Try logging in instead.');
        setLoading(false);
        return;
      }

      // If email confirmation is required, the session will be null
      if (!data.session) {
        setEmailConfirmation(true);
        setLoading(false);
        return;
      }

      // If auto-confirmed (e.g. email confirmation disabled), store auth state and redirect
      if (data.user && data.session) {
        login(
          {
            id: data.user.id,
            email: data.user.email ?? '',
            name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'User',
          },
          data.session.access_token
        );
      }

      router.push('/app/contracts/new');
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  // Password strength indicator
  const getPasswordStrength = (pw: string): { level: 'weak' | 'fair' | 'strong'; label: string; width: string; color: string } => {
    if (!pw) return { level: 'weak', label: '', width: '0%', color: '' };
    if (pw.length < 6) return { level: 'weak', label: 'Weak', width: '33%', color: 'bg-risk-high' };
    const hasUpper = /[A-Z]/.test(pw);
    const hasNumber = /\d/.test(pw);
    const hasSpecial = /[^A-Za-z0-9]/.test(pw);
    const score = [pw.length >= 8, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
    if (score >= 3) return { level: 'strong', label: 'Strong', width: '100%', color: 'bg-risk-low' };
    if (score >= 2) return { level: 'fair', label: 'Fair', width: '66%', color: 'bg-risk-medium' };
    return { level: 'weak', label: 'Weak', width: '33%', color: 'bg-risk-high' };
  };

  const strength = getPasswordStrength(password);

  // Email confirmation success state
  if (emailConfirmation) {
    return (
      <div className="min-h-screen bg-obsidian text-silver flex flex-col items-center justify-center relative overflow-hidden px-4 py-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none radial-purple-glow opacity-60" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[420px] relative z-10"
        >
          <div className="bg-surface/60 backdrop-blur-xl border border-edge rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/40 text-center">
            <div className="w-16 h-16 rounded-full bg-risk-low/10 border border-risk-low/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-risk-low" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight mb-3">
              Check your email
            </h1>
            <p className="text-silver text-sm leading-relaxed mb-2">
              We&apos;ve sent a verification link to
            </p>
            <p className="text-white font-semibold text-sm mb-6 bg-[#0a0a0a] border border-edge rounded-lg py-2 px-4 inline-block">
              {email}
            </p>
            <p className="text-muted-dim text-xs leading-relaxed mb-6">
              Click the link in the email to activate your account. If you don&apos;t see it, check your spam folder.
            </p>
            <Link
              href="/login"
              className="group inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-6 rounded-xl text-sm hover:scale-[1.01] transition-all duration-300 shadow-[0_0_25px_rgba(124,92,252,0.25)]"
            >
              <span>Go to Login</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian text-silver flex flex-col items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none radial-purple-glow opacity-60" />

      {/* Floating orbs for depth */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[420px] relative z-10"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-10 group">
          <Image
            src="/logo/legalGPT_logo.png"
            alt="LegalGPT Logo"
            width={36}
            height={36}
            className="group-hover:scale-105 transition-transform duration-300"
          />
          <span className="text-white font-bold text-xl tracking-tight">LegalGPT</span>
        </Link>

        {/* Card */}
        <div className="bg-surface/60 backdrop-blur-xl border border-edge rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/40">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
              Create your account
            </h1>
            <p className="text-silver text-sm">
              Start analysing contracts with AI
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2.5 bg-risk-high/10 border border-risk-high/20 text-risk-high rounded-xl px-4 py-3 mb-6 text-sm"
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="signup-email" className="text-xs font-semibold uppercase tracking-wider text-silver/80">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-dim pointer-events-none" />
                <input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setFieldErrors(prev => ({ ...prev, email: undefined })); }}
                  className={`w-full bg-[#0a0a0a] border ${fieldErrors.email ? 'border-risk-high/50' : 'border-edge'} rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-muted-dim focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all duration-200`}
                />
              </div>
              {fieldErrors.email && (
                <span className="text-risk-high text-xs mt-0.5">{fieldErrors.email}</span>
              )}
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="signup-password" className="text-xs font-semibold uppercase tracking-wider text-silver/80">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-dim pointer-events-none" />
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setFieldErrors(prev => ({ ...prev, password: undefined })); }}
                  className={`w-full bg-[#0a0a0a] border ${fieldErrors.password ? 'border-risk-high/50' : 'border-edge'} rounded-xl pl-10 pr-12 py-3 text-white text-sm placeholder-muted-dim focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all duration-200`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-dim hover:text-silver transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {fieldErrors.password && (
                <span className="text-risk-high text-xs mt-0.5">{fieldErrors.password}</span>
              )}
              {/* Password strength meter */}
              {password && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1 bg-edge rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                      style={{ width: strength.width }}
                    />
                  </div>
                  <span className={`text-[11px] font-medium ${
                    strength.level === 'strong' ? 'text-risk-low' :
                    strength.level === 'fair' ? 'text-risk-medium' : 'text-risk-high'
                  }`}>
                    {strength.label}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm password field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="signup-confirm-password" className="text-xs font-semibold uppercase tracking-wider text-silver/80">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-dim pointer-events-none" />
                <input
                  id="signup-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setFieldErrors(prev => ({ ...prev, confirmPassword: undefined })); }}
                  className={`w-full bg-[#0a0a0a] border ${fieldErrors.confirmPassword ? 'border-risk-high/50' : 'border-edge'} rounded-xl pl-10 pr-12 py-3 text-white text-sm placeholder-muted-dim focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all duration-200`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-dim hover:text-silver transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <span className="text-risk-high text-xs mt-0.5">{fieldErrors.confirmPassword}</span>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full flex items-center justify-center gap-2.5 bg-accent hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl text-sm hover:scale-[1.01] transition-all duration-300 shadow-[0_0_25px_rgba(124,92,252,0.25)] hover:shadow-[0_0_35px_rgba(124,92,252,0.35)] mt-1"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating account…</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Trust indicator */}
          <div className="flex items-center justify-center gap-2 mt-6 text-[11px] text-muted-dim">
            <ShieldCheck className="w-3.5 h-3.5 text-accent/60" />
            <span>Your data is encrypted and secure</span>
          </div>
        </div>

        {/* Footer link */}
        <p className="text-center text-sm text-silver mt-6">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-accent font-semibold hover:text-accent/80 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
