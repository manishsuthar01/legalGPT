'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Eye, EyeOff, ArrowRight, Loader2, AlertCircle, Mail, Lock, Scale } from 'lucide-react';

import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/features/auth/store/useAuthstore';
import { getAuthErrorMessage } from '@/features/auth/lib/errors';
import { validateEmail, validatePassword } from '@/features/auth/lib/validation';

export default function LoginPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    if (user) {
      router.replace('/app/contracts/new');
    }
  }, [user, router]);

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

    if (!emailResult.valid || !passwordResult.valid) {
      setFieldErrors({
        email: emailResult.valid ? undefined : emailResult.error,
        password: passwordResult.valid ? undefined : passwordResult.error,
      });
      return;
    }

    setLoading(true);

    try {
      const supabase = await createClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        setError(getAuthErrorMessage(authError));
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
              Sign In to Legal Workspace
            </h1>
            <p className="text-[#636F83] text-xs">
              Access your contract intelligence repository
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
              <label htmlFor="login-email" className="text-[10px] font-bold uppercase tracking-wider text-[#7E8B9F]">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#636F83] pointer-events-none" />
                <input
                  id="login-email"
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
              <label htmlFor="login-password" className="text-[10px] font-bold uppercase tracking-wider text-[#7E8B9F]">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#636F83] pointer-events-none" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your account password"
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
                  <span>Authenticating…</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer link */}
        <p className="text-center text-xs text-[#636F83] mt-5">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="text-[#4B72C2] font-medium hover:underline transition-colors"
          >
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
