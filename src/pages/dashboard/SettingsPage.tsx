import React, { useEffect, useState } from 'react';
import { Copy, CreditCard, Eye, EyeOff, Key, Plus, Trash2, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Alert, GlassCard, GradientButton, Input, OutlineButton, TabBar, TextArea, Toggle } from '../../components/ui';
import BrandProfileForm, { BrandProfile, defaultBrandProfile } from '../../components/BrandProfileForm';

const TABS = [
  { id: 'profile', label: 'Profile' },
  { id: 'brand', label: 'Brand' },
  { id: 'billing', label: 'Billing' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'api', label: 'API Keys' },
];

const NOTIF_SETTINGS = [
  { id: 'edit_complete', label: 'Video edit complete', desc: 'When an AI edit is ready for review', defaultOn: true },
  { id: 'approval', label: 'Approval required', desc: 'When content needs your approval', defaultOn: true },
  { id: 'partnership', label: 'New partnership match', desc: 'When a new brand match is found', defaultOn: true },
  { id: 'publish', label: 'Video published', desc: 'When a video is auto-published', defaultOn: false },
  { id: 'analytics', label: 'Weekly analytics report', desc: 'A summary of your weekly performance', defaultOn: true },
  { id: 'billing', label: 'Billing updates', desc: 'Invoices and subscription changes', defaultOn: true },
];

const DEFAULT_KEYS = [
  { id: 'key_1', name: 'Production API', prefix: 'cf_live_Kx...', created: 'Apr 1, 2025', lastUsed: '2h ago' },
  { id: 'key_2', name: 'Development', prefix: 'cf_test_Mw...', created: 'Mar 15, 2025', lastUsed: '3d ago' },
];

function authHeader() {
  return { Authorization: `Bearer ${localStorage.getItem('cf_token')}` };
}

export default function SettingsPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [notifs, setNotifs] = useState(() =>
    Object.fromEntries(NOTIF_SETTINGS.map(n => [n.id, n.defaultOn]))
  );
  const [showSecret, setShowSecret] = useState<Record<string, boolean>>({});
  const [apiKeys, setApiKeys] = useState(DEFAULT_KEYS);
  const [profile, setProfile] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    bio: 'Tech YouTuber & Creator Economy advocate. Helping creators scale with AI.',
    website: 'https://alexrivera.co',
  });
  const [brandProfile, setBrandProfile] = useState<BrandProfile>({
    ...defaultBrandProfile,
    brandName: 'AlexRivera',
    shortDescription: 'Tech YouTuber & Creator Economy advocate. Helping creators scale with AI.',
    website: 'https://alexrivera.co',
    primaryTone: 'Educational',
    preferredPlatforms: ['YouTube', 'TikTok', 'Instagram'],
    primaryColor: '#2563EB',
    secondaryColor: '#EC4899',
  });
  const updateBrand = (updates: Partial<BrandProfile>) => setBrandProfile(p => ({ ...p, ...updates }));

  useEffect(() => {
    fetch('/api/users/me/api-keys', { headers: authHeader() })
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setApiKeys(data); })
      .catch(() => {});
  }, []);

  const saveProfile = async () => {
    setSaveError('');
    try {
      const res = await fetch('/api/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(profile),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { message?: string }).message || 'Failed to save');
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      if (err instanceof TypeError) { setSaved(true); setTimeout(() => setSaved(false), 2500); }
      else setSaveError(err instanceof Error ? err.message : 'Failed to save');
    }
  };

  const saveBrand = async () => {
    setSaveError('');
    try {
      const res = await fetch('/api/users/me/brand', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(brandProfile),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { message?: string }).message || 'Failed to save brand');
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      if (err instanceof TypeError) { setSaved(true); setTimeout(() => setSaved(false), 2500); }
      else setSaveError(err instanceof Error ? err.message : 'Failed to save brand');
    }
  };

  const saveNotifs = async () => {
    setSaveError('');
    try {
      const res = await fetch('/api/users/me/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(notifs),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { message?: string }).message || 'Failed to save');
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      if (err instanceof TypeError) { setSaved(true); setTimeout(() => setSaved(false), 2500); }
      else setSaveError(err instanceof Error ? err.message : 'Failed to save preferences');
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 text-sm mt-0.5">Manage your account, brand, and preferences</p>
      </div>

      <TabBar tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'profile' && (
        <GlassCard className="p-7 space-y-5">
          {saved && <Alert variant="success" onClose={() => setSaved(false)}>Profile saved successfully</Alert>}
          {saveError && <Alert variant="error" onClose={() => setSaveError('')}>{saveError}</Alert>}
          {/* Avatar */}
          <div className="flex items-center gap-5">
            <div className="h-20 w-20 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
              {user?.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <OutlineButton size="sm" className="flex items-center gap-2"><User className="h-3.5 w-3.5" />Change photo</OutlineButton>
              <p className="text-xs text-slate-500 mt-2">JPG, PNG or WebP. Max 2MB.</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Full name" value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} />
            <Input label="Email address" type="email" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} />
          </div>
          <TextArea label="Bio" rows={3} value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} />
          <Input label="Website" type="url" value={profile.website} onChange={e => setProfile(p => ({ ...p, website: e.target.value }))} />
          <div className="flex items-center justify-between pt-2 border-t border-white/8">
            <OutlineButton size="sm" danger>Delete account</OutlineButton>
            <GradientButton size="md" onClick={saveProfile}>Save changes</GradientButton>
          </div>
        </GlassCard>
      )}

      {tab === 'brand' && (
        <div className="space-y-4">
          {saved && <Alert variant="success" onClose={() => setSaved(false)}>Brand profile saved successfully</Alert>}
          {saveError && <Alert variant="error" onClose={() => setSaveError('')}>{saveError}</Alert>}
          <p className="text-sm text-slate-400 leading-relaxed">
            These details train ContentFlow's AI to generate scripts, edits, and partnership pitches in your exact voice and style.
          </p>
          <BrandProfileForm brand={brandProfile} onChange={updateBrand} />
          <div className="flex justify-end pt-2">
            <GradientButton size="md" onClick={saveBrand}>Save brand profile</GradientButton>
          </div>
        </div>
      )}

      {tab === 'billing' && (
        <div className="space-y-4">
          <GlassCard highlighted className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-xs font-semibold uppercase tracking-wide mb-1">Current plan</p>
                <h3 className="text-white font-bold text-xl">Growth — €2,500/month</h3>
                <p className="text-slate-400 text-sm mt-1">Next billing date: May 1, 2025</p>
              </div>
              <div className="text-right">
                <div className="flex flex-col gap-2">
                  <OutlineButton size="sm">Upgrade to Premium</OutlineButton>
                  <button className="text-xs text-slate-500 hover:text-red-400 transition-colors">Cancel plan</button>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><CreditCard className="h-4 w-4" />Payment method</h3>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/3 border border-white/8">
              <div className="h-10 w-14 rounded-lg bg-[#1E293B] border border-white/10 flex items-center justify-center text-xs text-slate-400 font-bold">VISA</div>
              <div>
                <p className="text-sm text-white">•••• •••• •••• 4242</p>
                <p className="text-xs text-slate-500">Expires 12/27</p>
              </div>
              <OutlineButton size="sm" className="ml-auto">Update</OutlineButton>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-white font-semibold mb-4">Invoice history</h3>
            <div className="space-y-2">
              {[
                { date: 'Apr 1, 2025', amount: '€2,500', status: 'Paid' },
                { date: 'Mar 1, 2025', amount: '€2,500', status: 'Paid' },
                { date: 'Feb 1, 2025', amount: '€2,500', status: 'Paid' },
              ].map((inv, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-white/5">
                  <span className="text-sm text-slate-300">{inv.date}</span>
                  <span className="text-sm font-medium text-white">{inv.amount}</span>
                  <span className="text-xs text-green-400">{inv.status}</span>
                  <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Download</button>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {tab === 'notifications' && (
        <GlassCard className="p-7 space-y-5">
          <h3 className="text-white font-semibold">Email Notifications</h3>
          <div className="space-y-4">
            {NOTIF_SETTINGS.map(n => (
              <div key={n.id} className="flex items-center justify-between py-2 border-b border-white/5">
                <div>
                  <p className="text-sm font-medium text-white">{n.label}</p>
                  <p className="text-xs text-slate-500">{n.desc}</p>
                </div>
                <Toggle checked={notifs[n.id]} onChange={v => setNotifs(p => ({ ...p, [n.id]: v }))} />
              </div>
            ))}
          </div>
          <div className="flex justify-end pt-2">
            <GradientButton size="md" onClick={saveNotifs}>Save preferences</GradientButton>
          </div>
        </GlassCard>
      )}

      {tab === 'api' && (
        <div className="space-y-4">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold flex items-center gap-2"><Key className="h-4 w-4" />API Keys</h3>
                <p className="text-xs text-slate-500 mt-1">Use API keys to authenticate ContentFlow API requests</p>
              </div>
              <GradientButton size="sm"><Plus className="h-3.5 w-3.5 mr-1" />New key</GradientButton>
            </div>
            <div className="space-y-3">
              {apiKeys.map(k => (
                <div key={k.id} className="flex items-center gap-4 rounded-xl bg-white/3 border border-white/8 px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{k.name}</p>
                    <p className="text-xs text-slate-500">Created {k.created} · Last used {k.lastUsed}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs text-slate-400 font-mono bg-white/5 px-2 py-1 rounded">
                      {showSecret[k.id] ? 'cf_live_KxM...full_key_shown_here' : k.prefix}
                    </code>
                    <button onClick={() => setShowSecret(p => ({ ...p, [k.id]: !p[k.id] }))} className="text-slate-400 hover:text-white transition-colors">
                      {showSecret[k.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <button className="text-slate-400 hover:text-white transition-colors"><Copy className="h-4 w-4" /></button>
                    <button className="text-slate-400 hover:text-red-400 transition-colors"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
