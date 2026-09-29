'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Eye, EyeOff, ArrowRight, Loader2, AlertCircle, Mail, Lock } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { getAuthErrorMessage } from '@/features/auth/lib/errors';
import { validateEmail, validatePassword } from '@/features/auth/lib/validation';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    // Client-side validation
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
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        setError(getAuthErrorMessage(authError));
        setLoading(false);
        return;
      }

      // Redirect to the main authenticated app route
      router.push('/app/contracts/new');
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
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
              Welcome back
            </h1>
            <p className="text-silver text-sm">
              Sign in to your LegalGPT account
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
              <label htmlFor="login-email" className="text-xs font-semibold uppercase tracking-wider text-silver/80">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-dim pointer-events-none" />
                <input
                  id="login-email"
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
              <label htmlFor="login-password" className="text-xs font-semibold uppercase tracking-wider text-silver/80">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-dim pointer-events-none" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
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
                  <span>Signing in…</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer link */}
        <p className="text-center text-sm text-silver mt-6">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="text-accent font-semibold hover:text-accent/80 transition-colors"
          >
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
