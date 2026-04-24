import React, { useState } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | ''; text: string }>({ type: '', text: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage({ type: 'error', text: 'Email and password are required' });
      return;
    }
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      await login(email, password);
      setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
      setTimeout(() => { navigate('/dashboard'); onClose(); }, 1200);
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-8 w-full max-w-md relative shadow-2xl">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">Welcome back</h2>
          <p className="text-slate-400 text-sm">Sign in to your ContentFlow account</p>
        </div>

        {message.text && (
          <div className={`flex items-center gap-2.5 p-3 rounded-xl mb-5 text-sm ${
            message.type === 'success'
              ? 'bg-green-500/15 border border-green-500/30 text-green-300'
              : 'bg-red-500/15 border border-red-500/30 text-red-300'
          }`}>
            {message.type === 'success'
              ? <CheckCircle className="h-4 w-4 shrink-0" />
              : <AlertCircle className="h-4 w-4 shrink-0" />}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setMessage({ type: '', text: '' }); }}
              placeholder="you@example.com"
              disabled={loading}
              className="w-full bg-[#0f172a] border border-slate-600 rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setMessage({ type: '', text: '' }); }}
              placeholder="••••••••"
              disabled={loading}
              className="w-full bg-[#0f172a] border border-slate-600 rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-60"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
              <input type="checkbox" className="w-3.5 h-3.5 rounded" disabled={loading} />
              Remember me
            </label>
            <a href="/forgot-password" className="text-blue-400 hover:text-blue-300 transition-colors">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 mt-2"
            style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1d4ed8 55%, #9333ea 85%, #EC4899 100%)' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="text-center text-slate-500 text-sm pt-1">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Sign up free
            </a>
          </p>
        </form>

        {import.meta.env.DEV && (
          <div className="mt-6 pt-5 border-t border-slate-700/60">
            <p className="text-xs text-slate-600 mb-2">Demo credentials:</p>
            <div className="bg-[#0f172a] rounded-xl px-3 py-2.5 text-xs text-slate-500 space-y-1">
              <p>creator@contentflow.ai / password123</p>
              <p>admin@contentflow.ai / password123</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
