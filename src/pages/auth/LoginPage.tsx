import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Alert, GlassCard, GradientButton, Input } from '../../components/ui';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Minimum 6 characters';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
        <p className="text-slate-400 text-sm">Sign in to your ContentFlow account</p>
      </div>

      <GlassCard className="p-8">
        {success && <Alert variant="success" className="mb-6">Connexion réussie ! Redirecting…</Alert>}
        {error && <Alert variant="error" onClose={() => setError('')} className="mb-6">{error}</Alert>}

        <form onSubmit={submit} className="space-y-5">
          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })); }}
            error={errors.email}
            autoComplete="email"
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-300">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })); }}
                autoComplete="current-password"
                className={`w-full rounded-xl border px-4 py-3 pr-11 text-sm text-white placeholder:text-slate-400 outline-none transition-all duration-200 ${errors.password ? 'border-red-500/60 bg-red-900/30' : 'border-slate-600 bg-[#1e293b] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'}`}
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <div
                onClick={() => setRemember(!remember)}
                className={`h-4 w-4 rounded border transition-colors ${remember ? 'bg-blue-600 border-blue-600' : 'border-white/20 bg-white/5'}`}
              >
                {remember && <svg className="h-full w-full text-white p-0.5" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <span className="text-sm text-slate-400">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
              Forgot password?
            </Link>
          </div>

          <GradientButton type="submit" size="lg" disabled={loading} className="w-full">
            {loading ? 'Signing in...' : <>Sign in <ArrowRight className="h-4 w-4" /></>}
          </GradientButton>
        </form>

        <div className="mt-6 pt-6 border-t border-white/8 text-center">
          <p className="text-sm text-slate-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">Create one free</Link>
          </p>
        </div>

        {/* Demo shortcut — development only */}
        {import.meta.env.DEV && (
          <div className="mt-4 rounded-xl bg-white/3 border border-white/8 px-4 py-3">
            <p className="text-xs text-slate-500 text-center mb-2">Demo credentials — click to fill</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { setEmail('creator@contentflow.ai'); setPassword('Password123!'); }}
                className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                Creator account
              </button>
              <button
                type="button"
                onClick={() => { setEmail('admin@contentflow.ai'); setPassword('Password123!'); }}
                className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                Admin account
              </button>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
