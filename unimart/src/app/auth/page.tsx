// src/app/auth/page.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, GraduationCap, ArrowRight, CheckCircle } from 'lucide-react';
import { signUpWithEmail, signInWithEmail, signInWithGoogle } from '@/lib/auth';
import { CAMPUSES } from '@/types';
import { cn } from '@/lib/utils';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    university: 'University of Lagos',
  });

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      if (mode === 'signup') {
        await signUpWithEmail(form.email, form.password, form.name, form.university);
      } else {
        await signInWithEmail(form.email, form.password);
      }
      window.location.href = '/marketplace';
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      window.location.href = '/marketplace';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Left side - brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">U</span>
            </div>
            <span className="font-display font-bold text-2xl text-white">
              uni<span className="text-accent">mart</span>
            </span>
          </Link>
        </div>

        <div className="relative space-y-8">
          <div>
            <h2 className="font-display font-bold text-4xl text-white leading-tight mb-4">
              Your campus,<br />
              your marketplace.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Join thousands of students buying and selling within their university. Safe, fast, and built for campus life.
            </p>
          </div>

          <div className="space-y-3">
            {[
              '✅ Free to list and browse',
              '🏫 Campus-verified sellers only',
              '⚡ Items sold in hours, not days',
              '🔒 Safe campus trading',
            ].map((feat) => (
              <div key={feat} className="flex items-center gap-3 text-white/80 text-sm font-medium">
                {feat}
              </div>
            ))}
          </div>

          {/* Floating stat cards */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: '10K+', label: 'Active Students' },
              { value: '50+', label: 'Universities' },
            ].map(({ value, label }) => (
              <div key={label} className="bg-white/10 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <div className="font-display font-bold text-2xl text-white">{value}</div>
                <div className="text-white/50 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-white font-display font-bold">U</span>
            </div>
            <span className="font-display font-bold text-xl text-primary">uni<span className="text-accent">mart</span></span>
          </Link>

          {/* Tab switcher */}
          <div className="flex p-1 bg-surface rounded-2xl mb-8 border border-primary/5">
            {(['login', 'signup'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  'flex-1 py-2.5 rounded-xl text-sm font-bold capitalize transition-all',
                  mode === m ? 'bg-white text-primary shadow-sm' : 'text-ink/50 hover:text-ink'
                )}
              >
                {m === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div>
                <h1 className="font-display font-bold text-2xl text-ink">
                  {mode === 'login' ? 'Welcome back!' : 'Join Unimart'}
                </h1>
                <p className="text-ink/50 text-sm mt-1">
                  {mode === 'login'
                    ? 'Sign in to your student account'
                    : 'Create your free student account today'
                  }
                </p>
              </div>

              {/* Google button */}
              <button
                onClick={handleGoogle}
                className="w-full flex items-center justify-center gap-3 py-3 bg-white border-2 border-primary/10 rounded-2xl font-semibold text-sm hover:border-primary/30 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-primary/10" />
                <span className="text-xs text-ink/30 font-medium">or with email</span>
                <div className="flex-1 h-px bg-primary/10" />
              </div>

              {/* Form fields */}
              {mode === 'signup' && (
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-surface border border-primary/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  />
                </div>
              )}

              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30" />
                <input
                  type="email"
                  placeholder="Student Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-surface border border-primary/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                />
              </div>

              {mode === 'signup' && (
                <div className="relative">
                  <GraduationCap size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30" />
                  <select
                    value={form.university}
                    onChange={(e) => setForm({ ...form, university: e.target.value })}
                    className="w-full bg-surface border border-primary/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent appearance-none"
                  >
                    {CAMPUSES.filter((c) => c !== 'All Campuses').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-surface border border-primary/10 rounded-2xl pl-11 pr-12 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/30 hover:text-ink/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                onClick={handleSubmit}
                disabled={loading || !form.email || !form.password}
                className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-accent transition-colors disabled:opacity-50 group"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>

              {mode === 'signup' && (
                <p className="text-center text-xs text-ink/40 leading-relaxed">
                  By creating an account, you agree to our{' '}
                  <Link href="#" className="text-primary hover:text-accent transition-colors">Terms of Service</Link>{' '}
                  and{' '}
                  <Link href="#" className="text-primary hover:text-accent transition-colors">Privacy Policy</Link>
                </p>
              )}

              {mode === 'login' && (
                <p className="text-center text-sm text-ink/50">
                  Forgot password?{' '}
                  <Link href="#" className="text-primary font-semibold hover:text-accent transition-colors">
                    Reset it
                  </Link>
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
