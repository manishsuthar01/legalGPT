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
      <div className="min-h-screen bg-[#090B0E] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-[#4B72C2]" />
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setFieldErrors({});

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

      if (data.user && data.user.identities && data.user.identities.length === 0) {
        setError('An account with this email already exists. Try logging in instead.');
        setLoading(false);
        return;
      }

      if (!data.session) {
        setEmailConfirmation(true);
        setLoading(false);
        return;
      }

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

  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score >= 3) return { level: 'strong', label: 'Strong', width: '100%', color: 'bg-emerald-500' };
    if (score >= 2) return { level: 'fair', label: 'Fair', width: '66%', color: 'bg-amber-500' };
    return { level: 'weak', label: 'Weak', width: '33%', color: 'bg-rose-500' };
  };

  const strength = getPasswordStrength(password);

  if (emailConfirmation) {
    return (
      <div className="min-h-screen bg-[#090B0E] text-[#9DA8B9] flex flex-col items-center justify-center relative px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[400px] relative z-10"
        >
          <div className="bg-[#0F1218] border border-[#222938] rounded-xl p-6 sm:p-7 shadow-lg text-center select-text">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <h1 className="text-xl font-semibold text-[#F1F4F8] tracking-tight mb-2">
              Verification Email Sent
            </h1>
            <p className="text-[#9DA8B9] text-xs leading-relaxed mb-2">
              We&apos;ve sent a verification link to
            </p>
            <p className="text-[#F1F4F8] font-mono text-xs mb-4 bg-[#0B0E14] border border-[#1E2533] rounded py-1.5 px-3 inline-block">
              {email}
            </p>
            <p className="text-[#636F83] text-[11px] leading-relaxed mb-5">
              Click the link in the email to activate your account. If you don&apos;t see it, check your spam folder.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 bg-[#2B5EA7] hover:bg-[#356FBF] text-white font-medium py-2 px-4 rounded-md text-xs transition-colors shadow-sm"
            >
              <span>Return to Login</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090B0E] text-[#9DA8B9] flex flex-col items-center justify-center relative px-4 py-8 select-none">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[400px] relative z-10"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8 group">
          <div className="w-8 h-8 rounded-md bg-[#161B23] border border-[#273244] flex items-center justify-center p-1">
            <Image
              src="/logo/legalGPT_logo.png"
              alt="LegalGPT Logo"
              width={26}
              height={26}
              className="object-contain"
            />
          </div>
          <span className="text-[#F1F4F8] font-semibold text-lg tracking-tight">LegalGPT</span>
        </Link>

        {/* Card */}
        <div className="bg-[#0F1218] border border-[#222938] rounded-xl p-6 sm:p-7 shadow-lg select-text">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-semibold text-[#F1F4F8] tracking-tight mb-1">
              Create Counsel Account
            </h1>
            <p className="text-[#636F83] text-xs">
              Start auditing agreements with statutory intelligence
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-md px-3 py-2.5 mb-4 text-xs font-mono"
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="signup-email" className="text-[10px] font-bold uppercase tracking-wider text-[#7E8B9F]">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#636F83] pointer-events-none" />
                <input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  placeholder="counsel@firm.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setFieldErrors(prev => ({ ...prev, email: undefined })); }}
                  className={`w-full bg-[#0B0E14] border ${fieldErrors.email ? 'border-rose-500/50' : 'border-[#222938]'} rounded-md pl-9 pr-3 py-2 text-[#F1F4F8] text-xs placeholder-[#636F83] focus:outline-none focus:border-[#4B72C2] focus:ring-1 focus:ring-[#4B72C2] transition-colors`}
                />
              </div>
              {fieldErrors.email && (
                <span className="text-rose-400 text-[10px] font-mono mt-0.5">{fieldErrors.email}</span>
              )}
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="signup-password" className="text-[10px] font-bold uppercase tracking-wider text-[#7E8B9F]">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#636F83] pointer-events-none" />
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setFieldErrors(prev => ({ ...prev, password: undefined })); }}
                  className={`w-full bg-[#0B0E14] border ${fieldErrors.password ? 'border-rose-500/50' : 'border-[#222938]'} rounded-md pl-9 pr-10 py-2 text-[#F1F4F8] text-xs placeholder-[#636F83] focus:outline-none focus:border-[#4B72C2] focus:ring-1 focus:ring-[#4B72C2] transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#636F83] hover:text-[#9DA8B9] transition-colors rounded cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
              {fieldErrors.password && (
                <span className="text-rose-400 text-[10px] font-mono mt-0.5">{fieldErrors.password}</span>
              )}
              {/* Password strength meter */}
              {password && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1 bg-[#141923] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                      style={{ width: strength.width }}
                    />
                  </div>
                  <span className={`text-[10px] font-mono ${
                    strength.level === 'strong' ? 'text-emerald-400' :
                    strength.level === 'fair' ? 'text-amber-400' : 'text-rose-400'
                  }`}>
                    {strength.label}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm password field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="signup-confirm-password" className="text-[10px] font-bold uppercase tracking-wider text-[#7E8B9F]">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#636F83] pointer-events-none" />
                <input
                  id="signup-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setFieldErrors(prev => ({ ...prev, confirmPassword: undefined })); }}
                  className={`w-full bg-[#0B0E14] border ${fieldErrors.confirmPassword ? 'border-rose-500/50' : 'border-[#222938]'} rounded-md pl-9 pr-10 py-2 text-[#F1F4F8] text-xs placeholder-[#636F83] focus:outline-none focus:border-[#4B72C2] focus:ring-1 focus:ring-[#4B72C2] transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#636F83] hover:text-[#9DA8B9] transition-colors rounded cursor-pointer"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <span className="text-rose-400 text-[10px] font-mono mt-0.5">{fieldErrors.confirmPassword}</span>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#2B5EA7] hover:bg-[#356FBF] disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-md text-xs transition-colors shadow-sm mt-1 focus-ring cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Creating Account…</span>
                </>
              ) : (
                <>
                  <span>Create Counsel Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Trust indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-5 text-[11px] text-[#636F83]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Encrypted with TLS 1.3 • Attorney-Client Enclave</span>
          </div>
        </div>

        {/* Footer link */}
        <p className="text-center text-xs text-[#636F83] mt-5">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-[#4B72C2] font-medium hover:underline transition-colors"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
