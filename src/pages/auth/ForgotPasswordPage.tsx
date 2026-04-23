import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import { Alert, GlassCard, GradientButton, Input } from '../../components/ui';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Enter a valid email address'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { message?: string }).message || 'Failed to send reset email');
      }
      setSent(true);
    } catch (err) {
      if (err instanceof TypeError) {
        setSent(true);
      } else {
        setError(err instanceof Error ? err.message : 'Failed to send reset email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
          <Mail className="h-6 w-6 text-blue-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Forgot your password?</h1>
        <p className="text-slate-400 text-sm">Enter your email and we'll send you a reset link</p>
      </div>

      <GlassCard className="p-8">
        {sent ? (
          <div className="text-center space-y-4">
            <Alert variant="success">Reset link sent! Check your inbox.</Alert>
            <p className="text-slate-400 text-sm">Didn't receive it? Check spam or <button onClick={() => setSent(false)} className="text-blue-400 hover:text-blue-300">try again</button>.</p>
            <Link to="/login" className="block text-sm text-slate-500 hover:text-slate-300 mt-4 transition-colors">← Back to sign in</Link>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            {error && <Alert variant="error" onClose={() => setError('')}>{error}</Alert>}
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
            />
            <GradientButton type="submit" size="lg" disabled={loading} className="w-full">
              {loading ? 'Sending...' : <>Send reset link <ArrowRight className="h-4 w-4" /></>}
            </GradientButton>
            <Link to="/login" className="block text-center text-sm text-slate-500 hover:text-slate-300 transition-colors">← Back to sign in</Link>
          </form>
        )}
      </GlassCard>
    </div>
  );
}
