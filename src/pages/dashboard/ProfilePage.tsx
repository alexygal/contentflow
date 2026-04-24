import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AtSign, Camera, Check, Play, Tv2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Alert, GlassCard, GradientButton, Input, OutlineButton, Select, TextArea } from '../../components/ui';
import { api } from '../../utils/api';

const NICHES = [
  'Tech & Creator Tools',
  'Fitness & Health',
  'Gaming',
  'Finance & Investing',
  'Beauty & Fashion',
  'Travel & Lifestyle',
  'Food & Cooking',
  'Education & Tutorials',
  'Business & Entrepreneurship',
  'Entertainment & Comedy',
  'Music & Arts',
  'Parenting & Family',
  'Other',
];

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [nameParts] = useState(() => {
    const parts = (user?.name ?? '').split(' ');
    return { first: parts[0] ?? '', last: parts.slice(1).join(' ') };
  });

  const [form, setForm] = useState({
    firstName: nameParts.first,
    lastName: nameParts.last,
    email: user?.email ?? '',
    channelName: 'AlexRivera',
    niche: 'Tech & Creator Tools',
    bio: 'Tech YouTuber & Creator Economy advocate. Helping creators scale with AI.',
    website: 'https://alexrivera.co',
    twitter: '@alexrivera',
    instagram: '@alexrivera',
    youtube: 'youtube.com/@alexrivera',
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName.trim()) { setError('First name is required.'); return; }
    if (!form.email.trim()) { setError('Email is required.'); return; }
    setError('');
    setSaving(true);
    try {
      await api.patch('/api/users/me', {
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        channelName: form.channelName,
        niche: form.niche,
        bio: form.bio,
        website: form.website,
        twitter: form.twitter,
        instagram: form.instagram,
        youtube: form.youtube,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/dashboard')}
          className="h-8 w-8 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
          <p className="text-slate-400 text-sm mt-0.5">Update your personal info and channel details</p>
        </div>
      </div>

      {saved && <Alert variant="success">Profile saved successfully.</Alert>}
      {error && <Alert variant="error">{error}</Alert>}

      <form onSubmit={handleSave} className="space-y-5">
        {/* Avatar */}
        <GlassCard className="p-6">
          <h2 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Profile Photo</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
                {(form.firstName[0] ?? '') + (form.lastName[0] ?? '')}
              </div>
              <button
                type="button"
                className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-[#1e293b] border border-slate-600 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <Camera className="h-3 w-3" />
              </button>
            </div>
            <div>
              <p className="text-sm text-white font-medium">{form.firstName} {form.lastName}</p>
              <p className="text-xs text-slate-500 mt-0.5 capitalize">{user?.tier ?? 'growth'} plan · {user?.role ?? 'creator'}</p>
            </div>
          </div>
        </GlassCard>

        {/* Basic Info */}
        <GlassCard className="p-6">
          <h2 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Basic Info</h2>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="First name"
                placeholder="Alex"
                value={form.firstName}
                onChange={set('firstName')}
                required
              />
              <Input
                label="Last name"
                placeholder="Rivera"
                value={form.lastName}
                onChange={set('lastName')}
              />
            </div>
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={set('email')}
              required
            />
          </div>
        </GlassCard>

        {/* Channel Info */}
        <GlassCard className="p-6">
          <h2 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Channel Info</h2>
          <div className="space-y-4">
            <Input
              label="Channel / Brand name"
              placeholder="AlexRivera"
              value={form.channelName}
              onChange={set('channelName')}
            />
            <Select
              label="Niche"
              value={form.niche}
              onChange={set('niche')}
              options={NICHES.map(n => ({ value: n, label: n }))}
            />
            <TextArea
              label="Bio"
              rows={3}
              placeholder="Tell us about your channel and what you create..."
              value={form.bio}
              onChange={set('bio')}
            />
          </div>
        </GlassCard>

        {/* Social Links */}
        <GlassCard className="p-6">
          <h2 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Social Links</h2>
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 mt-3 text-slate-500">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" /></svg>
              </div>
              <Input
                label="Website"
                placeholder="https://yoursite.com"
                value={form.website}
                onChange={set('website')}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-400">
                  <span className="flex items-center gap-1.5"><AtSign className="h-3.5 w-3.5 text-sky-400" />Twitter / X</span>
                </label>
                <input
                  type="text"
                  placeholder="@handle"
                  value={form.twitter}
                  onChange={set('twitter')}
                  className="w-full rounded-xl border border-slate-600 bg-[#1e293b] px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-400">
                  <span className="flex items-center gap-1.5"><Camera className="h-3.5 w-3.5 text-pink-400" />Instagram</span>
                </label>
                <input
                  type="text"
                  placeholder="@handle"
                  value={form.instagram}
                  onChange={set('instagram')}
                  className="w-full rounded-xl border border-slate-600 bg-[#1e293b] px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-400">
                <span className="flex items-center gap-1.5"><Tv2 className="h-3.5 w-3.5 text-red-400" />YouTube</span>
              </label>
              <input
                type="text"
                placeholder="youtube.com/@yourchannel"
                value={form.youtube}
                onChange={set('youtube')}
                className="w-full rounded-xl border border-slate-600 bg-[#1e293b] px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>
        </GlassCard>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <OutlineButton type="button" size="md" onClick={() => navigate('/dashboard')}>
            Cancel
          </OutlineButton>
          <GradientButton type="submit" size="md" disabled={saving}>
            {saving ? 'Saving...' : saved ? <><Check className="h-4 w-4" /> Saved</> : 'Save changes'}
          </GradientButton>
        </div>
      </form>
    </div>
  );
}
