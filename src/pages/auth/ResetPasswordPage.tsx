import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Alert, GlassCard, GradientButton, Input } from '../../components/ui';

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (password.length < 8) errs.password = 'Minimum 8 characters';
    if (password !== confirm) errs.confirm = 'Passwords do not match';
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setDone(true);
    setLoading(false);
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Reset your password</h1>
        <p className="text-slate-400 text-sm">Enter your new password below.</p>
      </div>

      <GlassCard className="p-8">
        {done ? (
          <div className="text-center space-y-4">
            <Alert variant="success">Password reset successfully! Redirecting...</Alert>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            <Input
              label="New password"
              type="password"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })); }}
              error={errors.password}
            />
            <Input
              label="Confirm password"
              type="password"
              placeholder="Repeat your password"
              value={confirm}
              onChange={e => { setConfirm(e.target.value); setErrors(p => ({ ...p, confirm: '' })); }}
              error={errors.confirm}
            />
            <GradientButton type="submit" size="lg" disabled={loading} className="w-full">
              {loading ? 'Resetting...' : <>Reset password <ArrowRight className="h-4 w-4" /></>}
            </GradientButton>
            <Link to="/login" className="block text-center text-sm text-slate-500 hover:text-slate-300 transition-colors">← Back to sign in</Link>
          </form>
        )}
      </GlassCard>
    </div>
  );
}
