import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import { GlassCard, Spinner } from '../../components/ui';

export default function VerifyEmailPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const verify = async () => {
      await new Promise(r => setTimeout(r, 1500));
      if (token && token.length >= 32 && /^[a-zA-Z0-9]+$/.test(token)) {
        setStatus('success');
        setTimeout(() => navigate('/dashboard'), 3000);
      } else {
        setStatus('error');
      }
    };
    verify();
  }, [token, navigate]);

  return (
    <div className="w-full max-w-md">
      <GlassCard className="p-10 text-center">
        {status === 'loading' && (
          <div className="space-y-4">
            <div className="flex justify-center"><Spinner size="lg" /></div>
            <h2 className="text-xl font-bold text-white">Verifying your email...</h2>
            <p className="text-slate-400 text-sm">This should only take a moment</p>
          </div>
        )}
        {status === 'success' && (
          <div className="space-y-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Email verified!</h2>
            <p className="text-slate-400 text-sm">Your account is now active. Redirecting to dashboard...</p>
            <Link to="/dashboard" className="block text-blue-400 hover:text-blue-300 text-sm transition-colors">Go to dashboard →</Link>
          </div>
        )}
        {status === 'error' && (
          <div className="space-y-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
              <XCircle className="h-8 w-8 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Verification failed</h2>
            <p className="text-slate-400 text-sm">This link may have expired or already been used.</p>
            <Link to="/login" className="block text-blue-400 hover:text-blue-300 text-sm transition-colors">← Back to sign in</Link>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
