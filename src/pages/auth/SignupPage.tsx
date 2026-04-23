import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, ChevronLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Alert, GlassCard, GradientButton, Input, OutlineButton } from '../../components/ui';

const TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '€500',
    desc: 'Test AI content operations. Get started in 30 minutes.',
    features: ['4 scripts / month', '5 video edits', 'Email templates', 'YouTube + 1 platform', 'Analytics dashboard'],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '€2,500',
    desc: 'Complete content operations — scripts, videos, partnerships.',
    features: ['Unlimited scripts & emails', 'Unlimited video editing', 'All platforms', 'Partnership finder', 'Growth analytics'],
    recommended: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '€5,000',
    desc: 'Full revenue growth for established creators and agencies.',
    features: ['Everything in Growth', 'Proactive partnership scouting', 'Deal negotiation assistance', 'Weekly strategy calls', 'Dedicated account manager'],
  },
];

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [tier, setTier] = useState('growth');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalErr, setGlobalErr] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string) => { setForm(p => ({ ...p, [k]: v })); setErrors(p => ({ ...p, [k]: '' })); };

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'Minimum 8 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const next = () => { if (validateStep1()) setStep(2); };

  const submit = async () => {
    setLoading(true);
    setGlobalErr('');
    try {
      await signup(form.name, form.email, form.password, tier);
      navigate('/auth/complete-profile');
    } catch {
      setGlobalErr('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-3">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? 'text-white' : 'bg-white/8 text-slate-500 border border-white/15'}`}
                style={step >= s ? { background: 'linear-gradient(135deg, #2563EB, #EC4899)' } : {}}>
                {step > s ? <Check className="h-4 w-4" /> : s}
              </div>
              {s < 2 && <div className={`h-0.5 w-12 rounded ${step > s ? 'bg-blue-500' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">{step === 1 ? 'Create your account' : 'Choose your plan'}</h1>
        <p className="text-slate-400 text-sm">{step === 1 ? 'Start your 14-day free trial — no card needed' : 'You can change or cancel anytime'}</p>
      </div>

      {step === 1 ? (
        <GlassCard className="p-8">
          {globalErr && <Alert variant="error" className="mb-5">{globalErr}</Alert>}
          <div className="space-y-4">
            <Input label="Full name" type="text" placeholder="Alex Rivera" value={form.name} onChange={e => set('name', e.target.value)} error={errors.name} autoComplete="name" />
            <Input label="Email address" type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} error={errors.email} autoComplete="email" />
            <Input label="Password" type="password" placeholder="Minimum 8 characters" value={form.password} onChange={e => set('password', e.target.value)} error={errors.password} autoComplete="new-password" />
            <Input label="Confirm password" type="password" placeholder="Repeat your password" value={form.confirm} onChange={e => set('confirm', e.target.value)} error={errors.confirm} autoComplete="new-password" />
          </div>
          <GradientButton onClick={next} size="lg" className="w-full mt-6">
            Continue <ArrowRight className="h-4 w-4" />
          </GradientButton>
          <p className="text-center text-xs text-slate-500 mt-4">
            By creating an account you agree to our{' '}
            <Link to="#" className="text-blue-400 hover:underline">Terms</Link> and{' '}
            <Link to="#" className="text-blue-400 hover:underline">Privacy Policy</Link>
          </p>
          <div className="mt-5 pt-5 border-t border-white/8 text-center">
            <p className="text-sm text-slate-400">Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">Sign in</Link></p>
          </div>
        </GlassCard>
      ) : (
        <div className="space-y-4">
          {TIERS.map(t => (
            <button
              key={t.id}
              onClick={() => setTier(t.id)}
              className={`w-full text-left rounded-2xl border p-5 transition-all duration-200 ${
                tier === t.id
                  ? 'bg-[#1a2744] border-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.2)]'
                  : 'bg-white/3 border-white/8 hover:bg-white/5 hover:border-white/15'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${tier === t.id ? 'border-blue-500 bg-blue-500' : 'border-white/30'}`}>
                    {tier === t.id && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="font-semibold text-white">{t.name}</span>
                  {t.recommended && <span className="rounded-full px-2 py-0.5 text-xs font-semibold" style={{ background: 'linear-gradient(135deg, #2563EB, #EC4899)', color: '#fff' }}>Popular</span>}
                </div>
                <span className="text-xl font-bold text-white">{t.price}<span className="text-xs text-slate-400 font-normal">/mo</span></span>
              </div>
              <p className="text-sm text-slate-400 mb-3 ml-7">{t.desc}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 ml-7">
                {t.features.map((f) => (
                  <span key={f} className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Check className="h-3 w-3 text-blue-400" />{f}
                  </span>
                ))}
              </div>
            </button>
          ))}

          <div className="flex gap-3 pt-2">
            <OutlineButton onClick={() => setStep(1)} className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" /> Back
            </OutlineButton>
            <GradientButton onClick={submit} disabled={loading} size="lg" className="flex-1">
              {loading ? 'Creating account...' : <>Start free trial <ArrowRight className="h-4 w-4" /></>}
            </GradientButton>
          </div>
          <p className="text-center text-xs text-slate-500">No credit card required · Cancel anytime · 14-day free trial</p>
        </div>
      )}
    </div>
  );
}
